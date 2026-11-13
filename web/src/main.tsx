import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

let visitorId = localStorage.getItem('demo-visitor-id');
let accountId = localStorage.getItem('demo-account-id');
const isNewVisitor = !visitorId;
const isNewAccount = !accountId;

if (!visitorId) {
  visitorId = 'visitor-' + Math.random().toString(36).slice(2);
  localStorage.setItem('demo-visitor-id', visitorId);
}
if (!accountId) {
  accountId = 'account-' + Math.random().toString(36).slice(2);
  localStorage.setItem('demo-account-id', accountId);
}

pendo.initialize({
  visitor: {
    id: visitorId,
  },
  account: {
    id: accountId,
  },
  sessionReplay: { isActive: true },
});

// "Visitor identified" Track Event: fires once, on the first visit, when the
// app creates and stores a new visitor or account ID. The stored IDs act as a
// persistent guard, so later page loads don't fire it again. The Pendo agent
// attaches the visitor and account IDs itself.
if (isNewVisitor || isNewAccount) {
  window.pendo?.track?.('Visitor identified', {
    new_visitor: isNewVisitor,
    new_account: isNewAccount,
    session_replay_active: true,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
