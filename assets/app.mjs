import {calculateCost} from './cost.mjs';
const form = document.querySelector('#cost-form');
const yen = value => new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(value);
if (form) {
  const recalculate = () => {
    const error = document.querySelector('#cost-error');
    const output = document.querySelector('#cost-output');
    try {
      if (!form.checkValidity()) throw new Error('すべての金額欄に0以上の数値を入力してください。');
      const values = Object.fromEntries([...new FormData(form)].map(([key,value])=>[key,Number(value)]));
      const result=calculateCost(values);
      for (const key of ['firstPayment','server','domain','extras','total','monthly']) document.querySelector(`[data-value="${key}"]`).textContent=yen(result[key]);
      document.querySelector('[data-value="setup"]').textContent=yen(values.setup);
      document.querySelector('#period-label').textContent=`${values.months}か月運営するまでに支払う額`;
      document.querySelector('#payment-note').textContent=result.paidMonths>values.months?`契約を分割できないため、サーバーは${result.paidMonths}か月分の支払いになります。`:'サーバーは契約期間ごとの一括払い、ドメインは年払いで計算しています。';
      error.textContent=''; output.hidden=false;
    } catch (e) {error.textContent=e.message;output.hidden=true;}
  };
  form.addEventListener('input',recalculate);
  form.addEventListener('change',recalculate);
  form.addEventListener('reset',()=>setTimeout(recalculate,0));
  recalculate();
}
const checklist=document.querySelector('#launch-checklist');
if(checklist){
  const update=()=>{const all=[...checklist.querySelectorAll('input')];document.querySelector('#check-progress').textContent=`${all.filter(x=>x.checked).length} / ${all.length} 項目を確認`;};
  checklist.addEventListener('change',update);update();
}
document.querySelector('#print-checklist')?.addEventListener('click',()=>window.print());
