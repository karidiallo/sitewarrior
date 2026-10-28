# Formspree — SiteWarrior

Form endpoint: `https://formspree.io/f/mjyyrqal`

- `ORDER A WEBSITE` / lokalne CTA prowadzą do konfiguratora.
- `SEND ENQUIRY` / lokalne przyciski podsumowania otwierają formularz.
- Formularz wysyła POST asynchronicznie i pokazuje sukces wyłącznie po odpowiedzi 2xx.
- Przesyłane pola: name, email, phone, company, message, package, extras, delivery, estimated_total_net, currency, language, page_url, contact_consent.
- Cena jest orientacyjna i przesyłana jako dane informacyjne, nie jest płatnością ani wiążącym zamówieniem.
- Aktywuj i zweryfikuj formularz oraz adres odbiorczy w panelu Formspree. Wykonaj własną testową wysyłkę z opublikowanej domeny.
- Przed produkcją uzupełnij politykę prywatności odpowiednią do danych zbieranych przez formularz.
- GitHub Pages nie wymaga backendu — POST idzie do Formspree bezpośrednio z przeglądarki.

## Test lokalny

```sh
npm ci
npm run check
npm run build
```

## Wdrożenie

Podmień `src/main-{en,pl,no,fr,de}.js`, `src/order-form.js` i `src/style.css`. Commit na `main` uruchamia GitHub Actions.
