import { createPolarClient } from "@/lib/polar";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  const polar = createPolarClient(process.env.POLAR_ACCESS_TOKEN!, "sandbox");

  try {
    const checkout = await polar.checkouts.get("f691c789-0b75-43f1-8218-7a99fdaa685d");
    console.log("Checkout status:", checkout.status);
    console.log("Customer ID:", checkout.customer_id);

    if (checkout.customer_id) {
        const keysPage = await polar.licenseKeys.list({
            organization_id: process.env.POLAR_ORG_ID!,
            benefit_id: process.env.POLAR_BENEFIT_ID!,
            limit: 100,
        });
        console.log("Found keys matching org/benefit:", keysPage.items.length);
        const match = keysPage.items.find((k) => k.customer_id === checkout.customer_id);
        console.log("Match found:", match ? match.display_key : "No match for this customerId!");
    }
  } catch (e) {
    console.error(e);
  }
}
run();
