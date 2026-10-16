/**
 * Shared form helpers: accessible inline validation and submission.
 *
 * Submission: if the form has data-endpoint (PUBLIC_FORM_ENDPOINT), the data is
 * POSTed there as FormData with Accept: application/json, which works with
 * Formspree, Basin, Getform or a Vercel function. Without an endpoint this is a
 * stub that waits briefly and resolves, so the success state can be demoed.
 */

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const errorId = (name: string) => `${name}-error`;

function messageFor(el: Field): string {
  const v = el.validity;
  const d = el.dataset;
  if (v.valid) return '';
  if (v.valueMissing) return d.msgRequired ?? 'This field is required';
  if (v.typeMismatch && el.type === 'email') return 'Enter an email address in the format name@example.com';
  if (v.patternMismatch) return d.msgPattern ?? 'Please check the format of this field';
  if (v.tooShort) return d.msgPattern ?? `Please enter at least ${(el as HTMLInputElement).minLength} characters`;
  return el.validationMessage;
}

function setError(name: string, scope: HTMLElement, message: string, els: Field[]) {
  const box = scope.querySelector<HTMLElement>(`#${CSS.escape(errorId(name))}`);
  if (box) box.textContent = message;
  els.forEach((el) => el.setAttribute('aria-invalid', message ? 'true' : 'false'));
  const group = els[0]?.closest<HTMLElement>('[data-group]');
  if (group) group.toggleAttribute('data-invalid', !!message);
}

/** Validates every field inside `scope`. Returns the first invalid element, or null. */
export function validate(scope: HTMLElement): Field | null {
  const fields = [...scope.querySelectorAll<Field>('input, select, textarea')].filter(
    (el) => !el.disabled && el.type !== 'hidden' && el.name && !el.closest('[hidden]'),
  );
  const byName = new Map<string, Field[]>();
  fields.forEach((el) => byName.set(el.name, [...(byName.get(el.name) ?? []), el]));

  let first: Field | null = null;
  for (const [name, els] of byName) {
    let msg = '';
    if (els[0].type === 'radio') {
      const required = els.some((e) => e.required);
      if (required && !els.some((e) => (e as HTMLInputElement).checked)) {
        msg = els[0].dataset.msgRequired ?? 'Please choose an option';
      }
    } else {
      msg = messageFor(els[0]);
    }
    setError(name, scope, msg, els);
    if (msg && !first) first = els[0];
  }
  return first;
}

/** Re-validate a field once the user fixes it (only after it was flagged). */
export function liveValidate(form: HTMLFormElement) {
  form.addEventListener('input', (e) => revalidate(e.target as Field));
  form.addEventListener('change', (e) => revalidate(e.target as Field));
  function revalidate(el: Field) {
    if (!el.name) return;
    const flagged = form.querySelectorAll(`[name="${CSS.escape(el.name)}"][aria-invalid="true"]`).length > 0;
    if (!flagged) return;
    const scope = el.closest<HTMLElement>('[data-group]') ?? el.closest<HTMLElement>('.field') ?? form;
    validate(scope);
  }
}

export async function submit(form: HTMLFormElement): Promise<void> {
  const endpoint = form.dataset.endpoint;
  const data = new FormData(form);
  if (data.get('company_website')) return; // honeypot: silently drop bots
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
}
