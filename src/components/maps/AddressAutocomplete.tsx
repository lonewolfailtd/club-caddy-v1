'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin } from 'lucide-react';

const libraries: ("places")[] = ["places"];

// Custom styles for Google Places autocomplete dropdown
const customStyles = `
  /* Style the autocomplete dropdown container */
  .pac-container {
    background-color: #ffffff;
    border: 2px solid #731425 !important;
    border-radius: 0.125rem;
    box-shadow: 0 10px 25px rgba(115, 20, 37, 0.15) !important;
    margin-top: 4px;
    font-family: 'Inter', sans-serif !important;
    z-index: 9999 !important;
  }

  /* Remove default Google styles */
  .pac-container:after {
    display: none !important;
  }

  /* Style individual suggestion items */
  .pac-item {
    padding: 12px 16px !important;
    border-top: 1px solid #e4e4e7 !important;
    cursor: pointer;
    line-height: 1.5 !important;
    font-size: 15px !important;
    color: #18181b !important;
    transition: all 0.15s ease;
  }

  /* First item - no top border */
  .pac-item:first-child {
    border-top: none !important;
  }

  /* Hover state */
  .pac-item:hover,
  .pac-item.pac-item-selected {
    background-color: #fdf2f8 !important;
    border-left: 3px solid #731425 !important;
    padding-left: 13px !important;
  }

  /* Style the matched text */
  .pac-item-query {
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #731425 !important;
    font-family: 'Inter', sans-serif !important;
  }

  /* Style the secondary text (suburb, city) */
  .pac-item-query + span {
    font-size: 13px !important;
    color: #71717a !important;
    font-family: 'Inter', sans-serif !important;
    margin-left: 4px;
  }

  /* Style the icon */
  .pac-icon {
    display: none !important;
  }

  /* Add custom icon styling */
  .pac-item::before {
    content: '📍';
    margin-right: 10px;
    font-size: 14px;
    opacity: 0.7;
  }

  /* "Powered by Google" logo */
  .pac-logo {
    padding: 8px 12px !important;
    background-color: #fafafa;
  }

  /* Style when no results */
  .pac-item-no-results {
    padding: 16px !important;
    text-align: center;
    color: #a1a1aa !important;
    font-style: italic;
  }
`;

export interface AddressComponents {
  addressLine1: string;
  city: string;
  postalCode: string;
  country?: string;
  formattedAddress?: string;
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: AddressComponents) => void;
  onManualInput?: (value: string) => void; // Called when user types manually
  initialValue?: string;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function AddressAutocomplete({
  onAddressSelect,
  onManualInput,
  initialValue = '',
  error,
  label = 'Delivery Address',
  placeholder = 'Start typing your address...',
  required = false,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(initialValue);

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '',
    libraries,
  });

  // Sync inputValue with initialValue when it changes
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  // Inject custom styles for Google Places autocomplete dropdown
  useEffect(() => {
    const styleId = 'google-places-custom-styles';

    // Check if styles are already injected
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = customStyles;
      document.head.appendChild(styleElement);
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      // Initialize autocomplete
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'nz' }, // Restrict to New Zealand
        fields: ['address_components', 'formatted_address', 'geometry'],
        types: ['address'], // Only show street addresses
      });

      // Listen for place selection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();

        if (place && place.address_components) {
          const addressComponents = extractAddressComponents(place.address_components);
          const formattedAddress = place.formatted_address || '';

          setInputValue(formattedAddress);

          onAddressSelect({
            ...addressComponents,
            formattedAddress,
          });
        }
      });
    }
  }, [isLoaded, onAddressSelect]);

  // Extract address components from Google Places result
  const extractAddressComponents = (components: google.maps.GeocoderAddressComponent[]): AddressComponents => {
    let streetNumber = '';
    let route = '';
    let city = '';
    let postalCode = '';
    let country = '';

    components.forEach((component) => {
      const types = component.types;

      if (types.includes('street_number')) {
        streetNumber = component.long_name;
      }
      if (types.includes('route')) {
        route = component.long_name;
      }
      if (types.includes('locality')) {
        city = component.long_name;
      }
      if (types.includes('postal_code')) {
        postalCode = component.long_name;
      }
      if (types.includes('country')) {
        country = component.long_name;
      }
      // For New Zealand, sometimes suburb is used instead of locality
      if (types.includes('sublocality') && !city) {
        city = component.long_name;
      }
      // Postal town as fallback for city
      if (types.includes('postal_town') && !city) {
        city = component.long_name;
      }
    });

    const addressLine1 = `${streetNumber} ${route}`.trim();

    return {
      addressLine1,
      city,
      postalCode,
      country,
    };
  };

  // Loading state
  if (loadError) {
    return (
      <div className="space-y-2">
        <Label className="refined-body text-sm font-medium text-zinc-700">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </Label>
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm">
          <p className="refined-body text-sm text-amber-800">
            Unable to load address autocomplete. Please check your API key configuration.
          </p>
        </div>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter address manually"
          className="refined-body"
        />
        {error && <p className="refined-body text-red-600 text-sm">{error}</p>}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="space-y-2">
        <Label className="refined-body text-sm font-medium text-zinc-700">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </Label>
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 border-2 border-zinc-200 rounded-sm">
          <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
          <span className="refined-body text-sm text-zinc-500">Loading address search...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="address-autocomplete" className="refined-body text-sm font-medium text-zinc-700">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
        <Input
          ref={inputRef}
          id="address-autocomplete"
          type="text"
          value={inputValue}
          onChange={(e) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            // Also notify parent of manual input
            if (onManualInput) {
              onManualInput(newValue);
            }
          }}
          placeholder={placeholder}
          className={`refined-body pl-10 ${error ? 'border-red-500 focus:border-red-500' : ''}`}
          required={required}
        />
      </div>
      {error && <p className="refined-body text-red-600 text-sm">{error}</p>}
      <p className="refined-body text-xs text-zinc-500 flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        Start typing to see address suggestions
      </p>
    </div>
  );
}
