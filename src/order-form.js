// One shared Formspree order form for all language editions.
// Endpoint is public by design; Formspree receives only fields submitted by the visitor.
const ENDPOINT = 'https://formspree.io/f/mjyyrqal';
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function initOrderForm({ labels, language, getSelection, money }) {
  const trigger = document.getElementById('order');
  if (!trigger) throw new Error('Missing #order trigger');
  const dialog = document.createElement('dialog');
  dialog.className = 'sw-order-dialog';
  dialog.setAttribute('aria-labelledby','sw-form-heading');
  dialog.innerHTML = `
    <div class="sw-order-head">
      <div><p class="sw-order-eyebrow">SITEWARRIOR / ${escapeHtml(language.toUpperCase())}</p><h2 id="sw-form-heading">${escapeHtml(labels.head)}</h2><p>${escapeHtml(labels.desc)}</p></div>
      <button type="button" class="sw-order-close" aria-label="${escapeHtml(labels.close)}" data-close>×</button>
    </div>
    <form id="sw-order-form" action="${ENDPOINT}" method="POST">
      <div class="sw-order-fields">
        <label>${escapeHtml(labels.name)} <span>*</span><input name="name" autocomplete="name" required maxlength="120" /></label>
        <label>${escapeHtml(labels.email)} <span>*</span><input name="email" type="email" autocomplete="email" required maxlength="254" /></label>
        <label>${escapeHtml(labels.phone)}<input name="phone" type="tel" autocomplete="tel" maxlength="40" /></label>
        <label>${escapeHtml(labels.business)}<input name="company" autocomplete="organization" maxlength="160" /></label>
        <label class="sw-order-wide">${escapeHtml(labels.message)}<textarea name="message" rows="4" maxlength="2500"></textarea></label>
      </div>
      <div class="sw-order-quote"><strong>${escapeHtml(labels.estimate)}</strong><pre id="sw-form-summary"></pre></div>
      <input type="hidden" name="_subject" value="${escapeHtml(labels.subject)}" />
      <input type="hidden" name="language" value="${escapeHtml(language)}" />
      <input type="hidden" name="package" />
      <input type="hidden" name="extras" />
      <input type="hidden" name="delivery" />
      <input type="hidden" name="estimated_total_net" />
      <input type="hidden" name="currency" />
      <input type="hidden" name="page_url" />
      <div class="sw-honey" aria-hidden="true"><label>Leave this field empty<input name="_gotcha" autocomplete="off" tabindex="-1" /></label></div>
      <label class="sw-order-consent"><input type="checkbox" name="contact_consent" value="yes" required /> <span>${escapeHtml(labels.agree)}</span></label>
      <p class="sw-order-status" id="sw-order-status" role="status" aria-live="polite"></p>
      <div class="sw-order-actions"><button type="button" class="sw-order-cancel" data-close>${escapeHtml(labels.cancel)}</button><button type="submit" class="sw-order-submit">${escapeHtml(labels.submit)} <span aria-hidden="true">↗</span></button></div>
    </form>
    <div class="sw-order-success" id="sw-order-success" hidden><p>${escapeHtml(labels.success)}</p><button type="button" data-close>${escapeHtml(labels.close)}</button></div>`;
  document.body.appendChild(dialog);
  const form = dialog.querySelector('form');
  const status = dialog.querySelector('#sw-order-status');
  const submit = dialog.querySelector('[type="submit"]');
  const success = dialog.querySelector('#sw-order-success');
  dialog.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { submit.disabled = false; submit.textContent = labels.submit; });
  const open = () => {
    const {selected, selectedExtras, total, rush} = getSelection();
    const delivery = rush ? '48 h (+50%)' : '7 days / 7 dni';
    const summary = [selected.name, ...selectedExtras.map(extra => extra.name), delivery, money(total) + ' net'].join('\n');
    form.elements.namedItem('package').value = selected.name;
    form.elements.namedItem('extras').value = selectedExtras.length ? selectedExtras.map(x=>x.name).join(', ') : 'None';
    form.elements.namedItem('delivery').value = delivery;
    form.elements.namedItem('estimated_total_net').value = String(total);
    form.elements.namedItem('currency').value = language === 'pl' ? 'PLN' : 'EUR';
    form.elements.namedItem('page_url').value = location.href;
    dialog.querySelector('#sw-form-summary').textContent = summary;
    status.textContent = '';
    form.hidden = false;
    success.hidden = true;
    dialog.showModal();
    form.elements.namedItem('name').focus();
  };
  trigger.setAttribute('href','#pricing');
  trigger.addEventListener('click',event=>{event.preventDefault();open();});
  form.addEventListener('submit', async event=>{
    event.preventDefault();
    if (!form.reportValidity()) { status.textContent = labels.required; return; }
    submit.disabled = true;
    submit.textContent = labels.sending;
    status.textContent = '';
    try {
      const response = await fetch(ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if (!response.ok) throw new Error(`Formspree HTTP ${response.status}`);
      form.reset();
      form.hidden = true;
      success.hidden = false;
    } catch(error) {
      console.error('Form submission failed:',error);
      status.textContent = labels.failure;
    } finally {
      submit.disabled = false;
      submit.textContent = labels.submit;
    }
  });
}
