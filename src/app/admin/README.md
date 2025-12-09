# Admin Dashboard

The Club Caddy Admin Dashboard provides comprehensive management tools for the rental booking system.

## Features

### 1. Dashboard Overview (`/admin`)
- **Real-time Statistics**: View key metrics including total bookings, revenue, inventory, and average booking value
- **Quick Stats**: See confirmed, pending bookings, and customer counts at a glance
- **Recent Bookings**: Monitor the latest bookings and their statuses
- **Upcoming Rentals**: Track confirmed bookings approaching their start dates
- **Action Alerts**: Get notified of pending bookings requiring attention
- **Quick Links**: Fast access to all management sections

### 2. Bookings Management (`/admin/bookings`)
- **List View**: Comprehensive table of all bookings with sorting and filtering
- **Search**: Find bookings by booking number, customer name, or email
- **Filters**: Filter by status (pending, confirmed, completed, etc.) and payment status
- **Quick Actions**:
  - View detailed booking information
  - Confirm pending bookings
  - Cancel bookings
  - Add admin notes
- **Export**: Download booking data as CSV for reporting
- **Calendar View**: Visual calendar view (coming soon)

### 3. Inventory Management (`/admin/inventory`)
- **Product Inventory**: Track total, available, reserved, and maintenance quantities for each product
- **Utilization Monitoring**: See real-time utilization rates with visual indicators
- **Low Inventory Alerts**: Get warned when available quantities are low
- **Availability Blocks**: Block dates for maintenance, holidays, or other reasons
- **Quick Updates**: Easily adjust total quantities and maintenance schedules

### 4. Pricing Management (`/admin/pricing`)
- **Rate Management**: Set hourly, daily, weekly, and monthly rates for each product
- **Bulk Updates**: Apply percentage changes to all products at once
- **Rental Toggle**: Enable or disable rental availability per product
- **Minimum Hours**: Configure minimum rental periods for hourly bookings
- **Deposit Settings**: Set deposit amounts for products
- **Pricing Tips**: Built-in guidance for competitive pricing

### 5. Quote Management (`/admin/quotes`)
- **Quote Tracking**: View and manage all customer quote requests
- **Status Management**: Mark quotes as responded, converted, or rejected
- **Conversion Tracking**: Monitor quote-to-booking conversion rates
- **Customer Details**: Access complete customer and event information
- **Admin Notes**: Add internal notes about quote requests

## Access Control

### Authentication
- Admin dashboard requires authentication via Supabase Auth
- Users without admin privileges are automatically redirected to the home page

### Admin Role
To grant admin access to a user:

```sql
-- Via Supabase SQL Editor
UPDATE profiles
SET is_admin = true
WHERE email = 'admin@example.com';
```

## Navigation

The sidebar provides quick access to all sections:
- **Dashboard**: Overview and statistics
- **Bookings**: Booking management
- **Inventory**: Inventory control
- **Pricing**: Rate management
- **Quotes**: Quote request management

## API Routes

The admin dashboard uses these API endpoints:

### Admin Operations
- `GET /api/admin/stats` - Fetch dashboard statistics
- `PATCH /api/admin/inventory` - Update inventory quantities
- `PATCH /api/admin/pricing` - Update rental pricing
- `POST /api/admin/pricing/toggle-rental` - Toggle rental availability

### Booking Management
- `GET /api/bookings/[id]` - Get booking details
- `PATCH /api/bookings/[id]` - Update booking status
- `DELETE /api/bookings/[id]` - Cancel booking (admin only)

## Database Functions

The dashboard leverages these database functions:
- `get_booking_stats()` - Calculate booking statistics for date ranges
- `check_availability()` - Verify cart availability for bookings
- Automated triggers for inventory management

## Security

### Row Level Security (RLS)
All database tables have RLS policies enabled:
- **Bookings**: Admins can view/edit all bookings
- **Inventory**: Admins have full access
- **Pricing**: Admins have full access
- **Availability Blocks**: Admins have full access

### Authentication Checks
Every admin page and API route verifies:
1. User is authenticated
2. User has `is_admin = true` in their profile

## Best Practices

### Booking Management
1. **Confirm bookings promptly**: Pending bookings should be confirmed within 24 hours
2. **Add admin notes**: Document any special arrangements or issues
3. **Monitor payments**: Check payment status matches booking status
4. **Export regularly**: Download booking data for record-keeping

### Inventory Management
1. **Update totals carefully**: Ensure total = available + reserved + maintenance
2. **Block maintenance dates**: Schedule maintenance during low-demand periods
3. **Monitor utilization**: High utilization (>80%) indicates need for more inventory
4. **Check low inventory**: Address alerts before accepting new bookings

### Pricing Management
1. **Competitive rates**: Review competitor pricing periodically
2. **Seasonal adjustments**: Use bulk updates for seasonal pricing changes
3. **Test changes**: Verify pricing on customer-facing booking pages
4. **Document changes**: Note reasons for price changes in admin notes

### Quote Management
1. **Respond quickly**: Reply to quote requests within 24 hours
2. **Convert to bookings**: Use the booking system to convert accepted quotes
3. **Track conversion**: Monitor conversion rates to improve sales process
4. **Archive old quotes**: Mark old quotes as rejected to keep list clean

## Troubleshooting

### Cannot Access Admin Dashboard
- Verify you're logged in to the correct account
- Check that your user has `is_admin = true` in the profiles table
- Clear browser cache and cookies, then log in again

### Inventory Counts Don't Match
- Check for bookings in pending or confirmed status
- Verify no database triggers failed
- Run inventory sync via database console if needed

### Bookings Not Appearing
- Check RLS policies are properly configured
- Verify the booking was created successfully
- Refresh the page or clear filters

### Export Not Working
- Ensure you have bookings matching current filters
- Check browser console for JavaScript errors
- Try a different browser if issues persist

## Future Enhancements

Planned features for future releases:
- **Calendar View**: Visual calendar with drag-and-drop booking management
- **Advanced Analytics**: Charts and graphs for revenue, utilization trends
- **Email Integration**: Send quotes and confirmations directly from dashboard
- **Customer Management**: Dedicated section for customer profiles and history
- **Automated Reminders**: System-generated reminders for upcoming bookings
- **Report Generation**: Automated daily/weekly/monthly reports
- **Multi-user Support**: Role-based permissions for different admin levels

## Support

For technical support or feature requests:
- Check the main project documentation
- Review API route implementations in `/src/app/api`
- Consult database schema in `/supabase/migrations`
