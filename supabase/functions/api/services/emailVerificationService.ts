import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export class EmailVerificationService {
  private readonly _supabaseClient;
  private readonly _baseEdgeFunctionUrl = Deno.env.get('BASE_EDGE_FUNCTION_URL');

  constructor() {
    const supabaseProjectUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (supabaseProjectUrl == undefined) {
      throw new Error("SUPABASE_URL is undefined");
    }

    if (supabaseServiceRoleKey == undefined) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is undefined");
    }

    this._supabaseClient = createClient(
      supabaseProjectUrl,
      supabaseServiceRoleKey
    );
  }


  private async isEmailValid(email: string): Promise<boolean> {

    const domain = email.split('@')[1];

    const { data, error } = await this._supabaseClient
      .from("blocklist")
      .select("domain")
      .eq("domain", domain)
      .maybeSingle();

    if (error) {
      // return error;
      console.error("Error checking code uniqueness:", error);
      throw new Error("Failed to check code uniqueness");
    }

    return !data;
  }
}
