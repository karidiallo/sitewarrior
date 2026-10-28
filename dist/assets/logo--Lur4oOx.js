(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const e of r)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function m(r){const e={};return r.integrity&&(e.integrity=r.integrity),r.referrerPolicy&&(e.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?e.credentials="include":r.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(r){if(r.ep)return;r.ep=!0;const e=m(r);fetch(r.href,e)}})();const y="https://formspree.io/f/mjyyrqal",n=t=>String(t).replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]);function b({labels:t,language:o,getSelection:m,money:c}){const r=document.getElementById("order");if(!r)throw new Error("Missing #order trigger");const e=document.createElement("dialog");e.className="sw-order-dialog",e.setAttribute("aria-labelledby","sw-form-heading"),e.innerHTML=`
    <div class="sw-order-head">
      <div><p class="sw-order-eyebrow">SITEWARRIOR / ${n(o.toUpperCase())}</p><h2 id="sw-form-heading">${n(t.head)}</h2><p>${n(t.desc)}</p></div>
      <button type="button" class="sw-order-close" aria-label="${n(t.close)}" data-close>×</button>
    </div>
    <form id="sw-order-form" action="${y}" method="POST">
      <div class="sw-order-fields">
        <label>${n(t.name)} <span>*</span><input name="name" autocomplete="name" required maxlength="120" /></label>
        <label>${n(t.email)} <span>*</span><input name="email" type="email" autocomplete="email" required maxlength="254" /></label>
        <label>${n(t.phone)}<input name="phone" type="tel" autocomplete="tel" maxlength="40" /></label>
        <label>${n(t.business)}<input name="company" autocomplete="organization" maxlength="160" /></label>
        <label class="sw-order-wide">${n(t.message)}<textarea name="message" rows="4" maxlength="2500"></textarea></label>
      </div>
      <div class="sw-order-quote"><strong>${n(t.estimate)}</strong><pre id="sw-form-summary"></pre></div>
      <input type="hidden" name="_subject" value="${n(t.subject)}" />
      <input type="hidden" name="language" value="${n(o)}" />
      <input type="hidden" name="package" />
      <input type="hidden" name="extras" />
      <input type="hidden" name="delivery" />
      <input type="hidden" name="estimated_total_net" />
      <input type="hidden" name="currency" />
      <input type="hidden" name="page_url" />
      <div class="sw-honey" aria-hidden="true"><label>Leave this field empty<input name="_gotcha" autocomplete="off" tabindex="-1" /></label></div>
      <label class="sw-order-consent"><input type="checkbox" name="privacy_acknowledgement" value="acknowledged" required /> <span>${n(t.agree)} <a class="sw-legal-link" href="${o==="en"?"/":`/${o}/`}privacy/" target="_blank" rel="noopener noreferrer">${n(t.privacy)}</a> · <a class="sw-legal-link" href="${o==="en"?"/":`/${o}/`}terms/" target="_blank" rel="noopener noreferrer">${n(t.terms)}</a></span></label>
      <p class="sw-order-status" id="sw-order-status" role="status" aria-live="polite"></p>
      <div class="sw-order-actions"><button type="button" class="sw-order-cancel" data-close>${n(t.cancel)}</button><button type="submit" class="sw-order-submit">${n(t.submit)} <span aria-hidden="true">→</span></button></div>
    </form>
    <div class="sw-order-success" id="sw-order-success" hidden><p>${n(t.success)}</p><button type="button" data-close>${n(t.close)}</button></div>`,document.body.appendChild(e);const s=e.querySelector("form"),l=e.querySelector("#sw-order-status"),d=e.querySelector('[type="submit"]'),p=e.querySelector("#sw-order-success");e.querySelectorAll("[data-close]").forEach(a=>a.addEventListener("click",()=>e.close())),e.addEventListener("click",a=>{a.target===e&&e.close()}),e.addEventListener("close",()=>{d.disabled=!1,d.textContent=t.submit});const g=()=>{const{selected:a,selectedExtras:i,total:f,rush:v}=m(),h=v?"48 h (+50%)":"7 days / 7 dni",w=[a.name,...i.map(u=>u.name),h,c(f)+" net"].join(`
`);s.elements.namedItem("package").value=a.name,s.elements.namedItem("extras").value=i.length?i.map(u=>u.name).join(", "):"None",s.elements.namedItem("delivery").value=h,s.elements.namedItem("estimated_total_net").value=String(f),s.elements.namedItem("currency").value=o==="pl"?"PLN":"EUR",s.elements.namedItem("page_url").value=location.href,e.querySelector("#sw-form-summary").textContent=w,l.textContent="",s.hidden=!1,p.hidden=!0,e.showModal(),s.elements.namedItem("name").focus()};r.setAttribute("href","#pricing"),r.addEventListener("click",a=>{a.preventDefault(),g()}),s.addEventListener("submit",async a=>{if(a.preventDefault(),!s.reportValidity()){l.textContent=t.required;return}d.disabled=!0,d.textContent=t.sending,l.textContent="";try{const i=await fetch(y,{method:"POST",body:new FormData(s),headers:{Accept:"application/json"}});if(!i.ok)throw new Error(`Formspree HTTP ${i.status}`);s.reset(),s.hidden=!0,p.hidden=!1}catch(i){console.error("Form submission failed:",i),l.textContent=t.failure}finally{d.disabled=!1,d.textContent=t.submit}})}const $=(t="")=>`<svg class="${t}" viewBox="0 0 260 310" role="img" aria-label="Znak graficzny SiteWarrior"><path fill="currentColor" d="M130 12 112 32 121 113 130 158 139 113 148 32ZM108 51 62 71 35 108 36 187 34 215 81 271 80 184 43 151 99 171 130 216 161 171 217 151 180 184 179 271 226 215 224 187 225 108 198 71 152 51 139 156 130 216 121 156Z"/><path fill="currentColor" opacity=".25" d="M130 12 148 32 139 113 130 158Z"/></svg>`;export{$ as h,b as i};
