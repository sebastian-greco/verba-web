import { Polar } from "@polar-sh/sdk";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function run() {
  const polar = new Polar({ 
    accessToken: process.env.POLAR_ACCESS_TOKEN, 
    server: "sandbox" 
  });
  
  try {
    const checkout = await polar.checkouts.get({ id: "f691c789-0b75-43f1-8218-7a99fdaa685d" });
    console.log("Checkout status:", checkout.status);
    console.log("Customer ID:", checkout.customerId);
    
    if (checkout.customerId) {
        const keysPage = await polar.licenseKeys.list({
            organizationId: process.env.POLAR_ORG_ID!,
            benefitId: process.env.POLAR_BENEFIT_ID!,
            limit: 100,
        });
        console.log("Found keys matching org/benefit:", keysPage.result.items.length);
        const match = keysPage.result.items.find((k) => k.customerId === checkout.customerId);
        console.log("Match found:", match ? match.displayKey : "No match for this customerId!");
    }
  } catch (e) {
    console.error(e);
  }
}
run();
