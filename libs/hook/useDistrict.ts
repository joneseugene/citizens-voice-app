'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { model } from '@/supabase/model';
import { DistrictInterface } from '@/libs/interface/district.interface';

const supabase = createClient();

export function useDistricts(regionId: string) {
  const [districts, setDistricts] = useState<DistrictInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!regionId) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from(model.districts)
          .select('id, name, region_id')
          .eq('region_id', regionId)
          .order('name');

        if (error) {
          throw new Error(error.message);
        }

        setDistricts(data ?? []);
      } catch (err) {
        setDistricts([]);

        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch districts',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [regionId]);

  return {
    districts,
    loading,
    error,
  };
}