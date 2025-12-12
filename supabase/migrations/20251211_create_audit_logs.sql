-- ================================================
-- AUDIT LOGGING SYSTEM
-- Tracks all sensitive operations for compliance
-- ================================================
-- Compliance: OWASP A09, CIS Control 8, GDPR Art. 30, PCI DSS 10
-- Retention: 7 years for financial, 3 years for others

BEGIN;

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  -- Who performed the action
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  user_ip_address INET,
  user_agent TEXT,

  -- What action was performed
  action TEXT NOT NULL CHECK (action IN (
    'create', 'update', 'delete', 'access', 'export',
    'login', 'logout', 'password_reset', 'payment', 'refund'
  )),
  resource_type TEXT NOT NULL,
  resource_id UUID,

  -- Details of the action
  old_values JSONB,
  new_values JSONB,
  metadata JSONB,

  -- Security classification
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  success BOOLEAN NOT NULL DEFAULT true,
  error_message TEXT,

  -- Compliance tracking
  retention_until TIMESTAMP WITH TIME ZONE,
  archived BOOLEAN DEFAULT false
);

-- Create indexes for performance
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_resource_id ON audit_logs(resource_id) WHERE resource_id IS NOT NULL;
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_severity ON audit_logs(severity);
CREATE INDEX idx_audit_logs_archived ON audit_logs(archived) WHERE archived = false;

-- Enable Row Level Security
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON audit_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.is_admin = true
    )
  );

-- System can insert audit logs (using service role or trigger)
CREATE POLICY "System can insert audit logs"
  ON audit_logs
  FOR INSERT
  WITH CHECK (true);

-- Function to automatically set retention date
CREATE OR REPLACE FUNCTION set_audit_retention()
RETURNS TRIGGER AS $$
BEGIN
  -- Financial records (bookings, payments): 7 years (NZ tax law)
  IF NEW.resource_type IN ('booking', 'payment') THEN
    NEW.retention_until := NEW.created_at + INTERVAL '7 years';
  -- Other records: 3 years (general compliance)
  ELSE
    NEW.retention_until := NEW.created_at + INTERVAL '3 years';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set retention on insert
CREATE TRIGGER trigger_set_audit_retention
  BEFORE INSERT ON audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION set_audit_retention();

-- Function to clean up expired audit logs (run monthly via cron)
CREATE OR REPLACE FUNCTION cleanup_expired_audit_logs()
RETURNS TABLE(archived_count INTEGER, deleted_count INTEGER) AS $$
DECLARE
  v_archived_count INTEGER := 0;
  v_deleted_count INTEGER := 0;
BEGIN
  -- Archive logs that have reached retention date
  UPDATE audit_logs
  SET archived = true
  WHERE retention_until < NOW()
    AND archived = false;

  GET DIAGNOSTICS v_archived_count = ROW_COUNT;

  -- Optionally: Delete archived logs older than retention + 1 year
  -- Uncomment if you want to permanently delete old logs
  -- DELETE FROM audit_logs
  -- WHERE archived = true
  --   AND created_at < NOW() - retention_until - INTERVAL '1 year';
  --
  -- GET DIAGNOSTICS v_deleted_count = ROW_COUNT;

  RETURN QUERY SELECT v_archived_count, v_deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get audit statistics (for admin dashboard)
CREATE OR REPLACE FUNCTION get_audit_stats(
  p_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() - INTERVAL '30 days',
  p_end_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS TABLE(
  total_logs BIGINT,
  by_action JSONB,
  by_resource_type JSONB,
  by_severity JSONB,
  failed_actions BIGINT,
  unique_users BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_logs,
    jsonb_object_agg(action, action_count) as by_action,
    jsonb_object_agg(resource_type, type_count) as by_resource_type,
    jsonb_object_agg(severity, severity_count) as by_severity,
    SUM(CASE WHEN success = false THEN 1 ELSE 0 END)::BIGINT as failed_actions,
    COUNT(DISTINCT user_id)::BIGINT as unique_users
  FROM (
    SELECT
      action,
      resource_type,
      severity,
      success,
      user_id,
      COUNT(*) OVER (PARTITION BY action) as action_count,
      COUNT(*) OVER (PARTITION BY resource_type) as type_count,
      COUNT(*) OVER (PARTITION BY severity) as severity_count
    FROM audit_logs
    WHERE created_at BETWEEN p_start_date AND p_end_date
  ) sub
  GROUP BY total_logs;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT SELECT ON audit_logs TO authenticated;
GRANT INSERT ON audit_logs TO authenticated, anon;
GRANT EXECUTE ON FUNCTION cleanup_expired_audit_logs() TO authenticated;
GRANT EXECUTE ON FUNCTION get_audit_stats(TIMESTAMP WITH TIME ZONE, TIMESTAMP WITH TIME ZONE) TO authenticated;

-- Add comment for documentation
COMMENT ON TABLE audit_logs IS 'Audit trail of all sensitive operations for compliance (GDPR, PCI DSS, etc.)';
COMMENT ON COLUMN audit_logs.retention_until IS 'Date when log can be archived/deleted per retention policy';
COMMENT ON FUNCTION cleanup_expired_audit_logs() IS 'Archives audit logs past retention period. Run monthly via cron job.';

COMMIT;

-- ================================================
-- USAGE EXAMPLES
-- ================================================
-- Clean up expired logs (run monthly):
-- SELECT * FROM cleanup_expired_audit_logs();
--
-- Get audit statistics for last 30 days:
-- SELECT * FROM get_audit_stats();
--
-- Get audit statistics for custom range:
-- SELECT * FROM get_audit_stats('2025-01-01'::timestamp, '2025-01-31'::timestamp);
--
-- Query recent critical events:
-- SELECT * FROM audit_logs
-- WHERE severity = 'critical'
--   AND created_at > NOW() - INTERVAL '7 days'
-- ORDER BY created_at DESC;
--
-- Query failed login attempts:
-- SELECT user_email, user_ip_address, created_at, error_message
-- FROM audit_logs
-- WHERE action = 'login'
--   AND success = false
--   AND created_at > NOW() - INTERVAL '24 hours'
-- ORDER BY created_at DESC;
