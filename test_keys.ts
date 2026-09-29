import { createPolarClient } from "@/lib/polar";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  const polar = createPolarClient(process.env.POLAR_ACCESS_TOKEN!, "sandbox");

  const keysPage = await polar.licenseKeys.list({
    organization_id: process.env.POLAR_ORG_ID!,
    benefit_id: process.env.POLAR_BENEFIT_ID!,
    limit: 1,
  });

  if (keysPage.items.length > 0) {
    const k = keysPage.items[0];
    console.log("Keys available on object:", Object.keys(k));
    console.log("displayKey:", k.display_key);
    console.log("key:", k.key);
  }
}
run();
