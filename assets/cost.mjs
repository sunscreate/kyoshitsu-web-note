export function calculateCost(input) {
  const keys = ['months','term','initialMonthly','renewMonthly','domainFirst','domainRenew','setup','extrasMonthly'];
  for (const key of keys) if (!Number.isFinite(input[key]) || input[key] < 0 || input[key] > 10000000) throw new Error('金額は0〜10,000,000の数値で入力してください。');
  if (![12,24,36].includes(input.term) || ![12,24,36].includes(input.months)) throw new Error('期間を選択してください。');
  const renewals = Math.max(0, Math.ceil((input.months-input.term)/input.term));
  const firstPayment = input.initialMonthly * input.term + input.domainFirst + input.setup;
  const server = input.initialMonthly * input.term + renewals * input.renewMonthly * input.term;
  const domain = input.domainFirst + (Math.ceil(input.months/12)-1)*input.domainRenew;
  const extras = input.extrasMonthly*input.months;
  const total = server+domain+input.setup+extras;
  return {firstPayment,server,domain,extras,total,monthly:total/input.months,paidMonths:input.term*(1+renewals)};
}
