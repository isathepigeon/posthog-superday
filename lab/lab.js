// Loja de treino. Dispara eventos no PostHog para o laboratorio de analytics.

// id do usuario logado, gerado quando a sessao comeca
const currentUserId = crypto.randomUUID();

const status = document.getElementById('status');

function setStatus(text) {
  status.textContent = text;
}

document.getElementById('login').addEventListener('click', () => {
  posthog.identify(currentUserId);
  posthog.capture('user_logged_in');
  setStatus('Logged in as ' + currentUserId.slice(0, 8));
});

document.getElementById('add').addEventListener('click', () => {
  posthog.capture('product_added_to_cart', {
    product: 'Milk 32%',
    price: 4.50
  });
  setStatus('Added Milk 32% to cart');
});

document.getElementById('checkout').addEventListener('click', () => {
  posthog.capture('checkout_completed', {
    total: 4.50,
    currency: 'EUR'
  });
  setStatus('Order placed');
});

document.getElementById('logout').addEventListener('click', () => {
  posthog.reset();
  setStatus('Not logged in');
});
