import { Polar } from "@polar-sh/sdk";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  const polar = new Polar({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN, 
    server: "sandbox" 
  });
  
  const keysPage = await polar.licenseKeys.list({
    organizationId: process.env.POLAR_ORG_ID!,
    benefitId: process.env.POLAR_BENEFIT_ID!,
    limit: 1,
  });
  
  if (keysPage.result.items.length > 0) {
    const k = keysPage.result.items[0];
    console.log("Keys available on object:", Object.keys(k));
    console.log("displayKey:", k.displayKey);
    console.log("key:", (k as any).key);
  }
}
run();
