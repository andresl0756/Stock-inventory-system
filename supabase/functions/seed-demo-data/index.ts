// @ts-ignore
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// @ts-ignore
import { createClient } from "npm:@supabase/supabase-js@2.53.0";

// Mock data and seeding logic have been removed as they are no longer needed.
// This function now serves as a basic template for a Supabase Edge Function.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // @ts-ignore
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    // @ts-ignore
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceKey) {
      throw new Error("Supabase environment variables (URL and SERVICE_ROLE_KEY) are not configured correctly in the Edge Function secrets.");
    }

    // @ts-ignore
    const supabase = createClient(supabaseUrl, serviceKey);

    // --- Seeding logic removed ---
    // This function no longer performs data seeding.
    // Add your new Edge Function logic here if needed.

    return new Response(JSON.stringify({ message: "Edge Function 'seed-demo-data' is active but no longer performs data seeding." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in Edge Function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});