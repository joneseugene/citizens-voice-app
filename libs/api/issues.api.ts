// src/libs/api/issue.api.ts

import { createClient } from '@/supabase/client';
import { model } from '@/supabase/model';
import { IssueInterface } from '@/libs/interface/issue.interface';

const supabase = createClient();

type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export async function createIssue(
  payload: IssueInterface,
): Promise<ApiResponse<IssueInterface>> {
  try {
    const { data, error } = await supabase
      .from(model.issues)
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error:
        err instanceof Error
          ? err.message
          : 'Failed to create issue',
    };
  }
}