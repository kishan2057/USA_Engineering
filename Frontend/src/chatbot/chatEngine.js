import { FAQ, SERVICES, COMPANY } from "./dataset";

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

export function getResponse(input) {
  const query = normalize(input);

  // Check FAQ keyword matches
  for (const faq of FAQ) {
    if (faq.keywords.some((kw) => query.includes(normalize(kw)))) {
      return faq.answer;
    }
  }

  // Check individual service matches
  for (const svc of SERVICES) {
    if (svc.keywords.some((kw) => query.includes(normalize(kw)))) {
      return `**${svc.title}**\n\n${svc.description}\n\nWant to know more or get a quote?\n📞 ${COMPANY.phone}\n✉️ ${COMPANY.email}`;
    }
  }

  // Fallback
  return `I'm not sure about that, but our team can help!\n\n📞 ${COMPANY.phone}\n✉️ ${COMPANY.email}\n\nOr try asking about:\n• Our services (MEP, Fire Protection, HVAC)\n• Locations we serve\n• How to get a quote\n• Our experience & team`;
}
