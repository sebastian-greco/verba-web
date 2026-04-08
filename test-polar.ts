import { Polar } from "@polar-sh/sdk";
const p = new Polar();
// intentionally compile error to see type
p.licenseKeys.list({ customerId: "test" });
