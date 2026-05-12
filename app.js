const STORAGE_KEY = "fitledger-v2";
const CONFIG_KEY = "fitledger-config-v1";

const bodyParts = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Cardio", "Mobility"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const exerciseImages = {
  Chest: "assets/exercises/chest.svg",
  Back: "assets/exercises/back.svg",
  Legs: "assets/exercises/legs.svg",
  Shoulders: "assets/exercises/shoulders.svg",
  Arms: "assets/exercises/arms.svg",
  Core: "assets/exercises/core.svg",
  Cardio: "assets/exercises/cardio.svg",
  Mobility: "assets/exercises/mobility.svg"
};

const exerciseCatalog = [
  ["Chest", "Beginner", "Wall Pushup", "Wall", "Keep body straight and control the descent"],
  ["Chest", "Beginner", "Incline Pushup", "Bench", "3 sets of 10-12"],
  ["Chest", "Beginner", "Knee Pushup", "Mat", "Brace core and avoid flared elbows"],
  ["Chest", "Beginner", "Machine Chest Press", "Machine", "Set handles at mid-chest height"],
  ["Chest", "Intermediate", "Dumbbell Bench Press", "Dumbbells", "Slow lower, strong press"],
  ["Chest", "Intermediate", "Incline Dumbbell Press", "Dumbbells", "Use a 30 degree incline"],
  ["Chest", "Intermediate", "Cable Chest Fly", "Cable", "Soft elbows and squeeze at center"],
  ["Chest", "Advanced", "Barbell Bench Press", "Barbell", "Use spotter for heavy sets"],
  ["Chest", "Advanced", "Weighted Dip", "Dip station", "Lean forward to bias chest"],
  ["Chest", "Advanced", "Plyometric Pushup", "Bodyweight", "Explosive press with soft landing"],
  ["Back", "Beginner", "Band Pull Apart", "Resistance band", "Open chest and squeeze shoulder blades"],
  ["Back", "Beginner", "Seated Cable Row", "Cable", "Neutral spine and controlled return"],
  ["Back", "Beginner", "Lat Pulldown", "Cable", "Pull elbows toward ribs"],
  ["Back", "Beginner", "Assisted Pullup", "Machine", "Full range without swinging"],
  ["Back", "Intermediate", "Single Arm Dumbbell Row", "Dumbbell", "Pause at top of each rep"],
  ["Back", "Intermediate", "Chest Supported Row", "Bench and dumbbells", "Avoid shrugging"],
  ["Back", "Intermediate", "Straight Arm Pulldown", "Cable", "Keep arms long and lats engaged"],
  ["Back", "Advanced", "Pullup", "Pullup bar", "Chest tall and full control"],
  ["Back", "Advanced", "Barbell Bent Over Row", "Barbell", "Hinge and keep back flat"],
  ["Back", "Advanced", "T-Bar Row", "T-bar", "Drive elbows back"],
  ["Legs", "Beginner", "Bodyweight Squat", "Bodyweight", "Sit between hips and stand tall"],
  ["Legs", "Beginner", "Goblet Squat", "Dumbbell", "Knees track over toes"],
  ["Legs", "Beginner", "Step Up", "Box", "Push through the full foot"],
  ["Legs", "Beginner", "Glute Bridge", "Mat", "Squeeze glutes at the top"],
  ["Legs", "Intermediate", "Leg Press", "Machine", "Avoid locking knees hard"],
  ["Legs", "Intermediate", "Romanian Deadlift", "Dumbbells", "Hinge from hips with soft knees"],
  ["Legs", "Intermediate", "Walking Lunge", "Dumbbells", "Tall torso and stable knee"],
  ["Legs", "Advanced", "Barbell Back Squat", "Barbell", "Brace before each rep"],
  ["Legs", "Advanced", "Deadlift", "Barbell", "Keep bar close and spine neutral"],
  ["Legs", "Advanced", "Bulgarian Split Squat", "Bench and dumbbells", "Control depth and balance"],
  ["Shoulders", "Beginner", "Dumbbell Lateral Raise", "Dumbbells", "Lead with elbows, light weight"],
  ["Shoulders", "Beginner", "Machine Shoulder Press", "Machine", "Start handles near ear level"],
  ["Shoulders", "Beginner", "Band Face Pull", "Resistance band", "Pull toward eyebrows"],
  ["Shoulders", "Intermediate", "Dumbbell Shoulder Press", "Dumbbells", "Ribs down and press overhead"],
  ["Shoulders", "Intermediate", "Cable Lateral Raise", "Cable", "Smooth tension through full range"],
  ["Shoulders", "Intermediate", "Rear Delt Fly", "Dumbbells", "Hinge and move from shoulders"],
  ["Shoulders", "Advanced", "Arnold Press", "Dumbbells", "Rotate without arching lower back"],
  ["Shoulders", "Advanced", "Barbell Overhead Press", "Barbell", "Brace glutes and core"],
  ["Shoulders", "Advanced", "Push Press", "Barbell", "Use leg drive and lockout control"],
  ["Arms", "Beginner", "Dumbbell Biceps Curl", "Dumbbells", "Keep elbows close to sides"],
  ["Arms", "Beginner", "Cable Triceps Pushdown", "Cable", "Lock elbows in place"],
  ["Arms", "Beginner", "Hammer Curl", "Dumbbells", "Neutral grip and slow lowering"],
  ["Arms", "Intermediate", "EZ Bar Curl", "EZ bar", "Avoid swinging the torso"],
  ["Arms", "Intermediate", "Overhead Triceps Extension", "Dumbbell", "Elbows point forward"],
  ["Arms", "Intermediate", "Preacher Curl", "Bench and EZ bar", "Full stretch at bottom"],
  ["Arms", "Advanced", "Close Grip Bench Press", "Barbell", "Elbows tucked and controlled"],
  ["Arms", "Advanced", "Skull Crusher", "EZ bar", "Lower toward forehead carefully"],
  ["Arms", "Advanced", "Weighted Chinup", "Pullup bar", "Supinated grip for biceps emphasis"],
  ["Core", "Beginner", "Dead Bug", "Mat", "Lower opposite arm and leg slowly"],
  ["Core", "Beginner", "Plank", "Mat", "Straight line from head to heel"],
  ["Core", "Beginner", "Bird Dog", "Mat", "Avoid hip rotation"],
  ["Core", "Intermediate", "Hanging Knee Raise", "Pullup bar", "Control swing"],
  ["Core", "Intermediate", "Cable Wood Chop", "Cable", "Rotate through upper back"],
  ["Core", "Intermediate", "Pallof Press", "Cable or band", "Resist rotation"],
  ["Core", "Advanced", "Hanging Leg Raise", "Pullup bar", "Posterior pelvic tilt at top"],
  ["Core", "Advanced", "Ab Wheel Rollout", "Ab wheel", "Brace hard and avoid sagging"],
  ["Core", "Advanced", "Dragon Flag Progression", "Bench", "Use progressions before full reps"],
  ["Cardio", "Beginner", "Incline Walk", "Treadmill", "10-20 minutes steady pace"],
  ["Cardio", "Beginner", "Stationary Bike", "Bike", "Low impact base conditioning"],
  ["Cardio", "Beginner", "Elliptical", "Machine", "Smooth full-body rhythm"],
  ["Cardio", "Intermediate", "Rowing Intervals", "Rower", "Drive legs, then pull"],
  ["Cardio", "Intermediate", "Battle Rope Waves", "Battle rope", "Short powerful intervals"],
  ["Cardio", "Intermediate", "Kettlebell Swing", "Kettlebell", "Hip snap, not shoulder lift"],
  ["Cardio", "Advanced", "Sprint Intervals", "Treadmill or track", "Use full warmup before sprints"],
  ["Cardio", "Advanced", "Assault Bike Intervals", "Air bike", "Hard 20-30 second efforts"],
  ["Cardio", "Advanced", "Burpee", "Bodyweight", "Keep reps crisp and controlled"],
  ["Mobility", "Beginner", "Cat Cow", "Mat", "Move slowly through spine"],
  ["Mobility", "Beginner", "World's Greatest Stretch", "Mat", "5 reps each side"],
  ["Mobility", "Beginner", "Hip Flexor Stretch", "Mat", "Squeeze glute on rear leg"],
  ["Mobility", "Intermediate", "90/90 Hip Switch", "Mat", "Control both directions"],
  ["Mobility", "Intermediate", "Thoracic Open Book", "Mat", "Rotate upper back"],
  ["Mobility", "Intermediate", "Ankle Dorsiflexion Drill", "Wall", "Knee tracks over toes"],
  ["Mobility", "Advanced", "Cossack Squat", "Bodyweight", "Keep heel down on working side"],
  ["Mobility", "Advanced", "Deep Squat Hold", "Bodyweight", "Breathe and open hips"],
  ["Mobility", "Advanced", "Shoulder Dislocate", "PVC or band", "Use wide grip and no pain"]
].map(([bodyPart, level, name, equipment, notes], index) => ({
  id: `ex-${index + 1}`,
  bodyPart,
  level,
  name,
  equipment,
  notes,
  imageUrl: exerciseImages[bodyPart]
}));

const seedData = {
  societies: [],
  clients: [],
  payments: [],
  sessions: [],
  exercises: exerciseCatalog
};

let state = loadState();
let config = loadConfig();
let syncStatus = config.webAppUrl ? "Connected" : "Local only";
let activeView = "clients";
let selectedClientId = state.clients[0]?.id || "";
let clientDetailOpen = false;
let modal = null;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : structuredClone(seedData);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadConfig() {
  const saved = localStorage.getItem(CONFIG_KEY);
  return saved ? JSON.parse(saved) : { webAppUrl: "" };
}

function saveConfig() {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

function isSheetConnected() {
  return Boolean(config.webAppUrl);
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function money(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function shortDate(value) {
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date(`${value}T00:00:00`));
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function societyName(id) {
  return state.societies.find((society) => society.id === id)?.name || "Unknown society";
}

function clientById(id) {
  return state.clients.find((client) => client.id === id);
}

function paymentForClient(clientId) {
  return state.payments
    .filter((payment) => payment.clientId === clientId)
    .sort((a, b) => b.dueDate.localeCompare(a.dueDate))[0];
}

function paymentState(payment) {
  if (!payment) return { label: "No cycle", className: "due" };
  if (payment.status === "Paid") return { label: "Paid", className: "paid" };
  const overdue = payment.dueDate < todayIso();
  return { label: overdue ? "Overdue" : "Due", className: overdue ? "missed" : "due" };
}

function expectedThisCycle() {
  return state.clients.filter((client) => client.status === "Active").reduce((sum, client) => sum + Number(client.monthlyFee || 0), 0);
}

function paidThisCycle() {
  return state.payments.filter((payment) => payment.status === "Paid").reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

function viewButton(id, label) {
  return `<button class="tab ${activeView === id ? "active" : ""}" data-view="${id}">${label}</button>`;
}

function appChrome(content) {
  const pending = expectedThisCycle() - paidThisCycle();
  return `
    <div class="app-shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">FL</div>
          <div>
            <h1>FitLedger</h1>
            <p>Trainer payments and workouts</p>
          </div>
        </div>
        <button class="sync-pill" data-modal="settings"><span class="dot ${isSheetConnected() ? "connected" : ""}"></span> ${syncStatus}</button>
      </header>
      <nav class="tabs">
        ${viewButton("clients", "Clients")}
        ${viewButton("payments", "Payments")}
        ${viewButton("finance", "Finance")}
        ${viewButton("exercises", "Exercises")}
      </nav>
      <main class="main with-rail">
        <section class="grid stats-grid">
          <div class="stat"><span>Active clients</span><strong>${state.clients.filter((c) => c.status === "Active").length}</strong></div>
          <div class="stat"><span>Collected</span><strong>${money(paidThisCycle())}</strong></div>
          <div class="stat"><span>Pending</span><strong>${money(pending)}</strong></div>
          <div class="stat"><span>Societies</span><strong>${state.societies.length}</strong></div>
        </section>
        ${content}
      </main>
      ${modal ? renderModal() : ""}
    </div>
  `;
}

function clientsView() {
  const selected = clientById(selectedClientId) || state.clients[0];
  if (clientDetailOpen && selected) return clientDetailView(selected);

  const cards = state.clients.length
    ? state.clients
    .map((client) => {
      const payment = paymentForClient(client.id);
      const status = paymentState(payment);
      return `
        <article class="client-card">
          <div class="client-main">
            <div>
              <h3>${client.name}</h3>
              <p>${societyName(client.societyId)} · ${client.level}</p>
            </div>
            <span class="chip ${status.className}">${status.label}</span>
          </div>
          <div class="chips">
            <span class="chip">${money(client.monthlyFee)}/month</span>
            <span class="chip">Due ${formatDate(payment?.dueDate)}</span>
          </div>
          <div class="actions">
            <button class="btn primary" data-select-client="${client.id}">Open</button>
            <button class="btn" data-modal="session" data-client="${client.id}">Log workout</button>
          </div>
        </article>
      `;
    })
    .join("")
    : `<div class="empty">No clients yet. Add a society first, then add your first client.</div>`;

  return appChrome(`
    <div class="view-title">
      <div>
        <h2>Clients</h2>
        <p>Open a client to see attendance, workouts, and payment cycles.</p>
      </div>
      <div class="actions">
        <button class="btn" data-modal="society">Add society</button>
        <button class="btn primary" data-modal="client">Add client</button>
      </div>
    </div>
    <section class="split">
      <div class="panel">
        <div class="section-head">
          <h3>Client roster</h3>
          <small>${state.clients.length} total</small>
        </div>
        <div class="client-list">${cards}</div>
      </div>
    </section>
  `);
}

function clientDetailView(client) {
  const payment = paymentForClient(client.id);
  const sessions = sessionsForClient(client.id);
  const week = lastSevenWorkoutDays(client.id);
  const trainedParts = [...new Set(week.flatMap((day) => day.sessions.flatMap((session) => session.bodyParts)))];
  const nextParts = bodyParts.filter((part) => !trainedParts.includes(part)).slice(0, 3);

  return appChrome(`
    <div class="view-title">
      <div>
        <button class="btn ghost back-btn" data-client-back>Back</button>
        <h2>${client.name}</h2>
        <p>${societyName(client.societyId)} · ${client.level} · Joined ${formatDate(client.startDate)}</p>
      </div>
      <div class="actions">
        <button class="btn primary" data-modal="session" data-client="${client.id}">Log workout</button>
        <button class="btn" data-modal="payment" data-client="${client.id}">Record payment</button>
      </div>
    </div>
    <section class="detail-top">
      <div class="panel">
        <div class="section-head">
          <h3>Last 7 days</h3>
          <small>${sessions.length} total logs</small>
        </div>
        <div class="week-list">
          ${week.map(workoutDayCard).join("")}
        </div>
      </div>
      <aside class="panel">
        <div class="section-head">
          <h3>Recommendation hint</h3>
        </div>
        <p class="meta">Recently trained</p>
        <div class="chips">${trainedParts.map((part) => `<span class="chip">${part}</span>`).join("") || `<span class="chip missed">No workouts in last 7 days</span>`}</div>
        <p class="meta gap-top">Consider next</p>
        <div class="chips">${nextParts.map((part) => `<span class="chip due">${part}</span>`).join("") || `<span class="chip paid">Balanced week</span>`}</div>
        <div class="finance-row">
          <div>
            <strong>Current payment</strong>
            <small>Due ${formatDate(payment?.dueDate)}</small>
          </div>
          <div class="amount">${payment?.status === "Paid" ? "Paid" : money(payment?.amount || client.monthlyFee)}</div>
        </div>
      </aside>
    </section>
  `);
}

function sessionsForClient(clientId) {
  return state.sessions
    .filter((session) => session.clientId === clientId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function lastSevenWorkoutDays(clientId) {
  const today = new Date(`${todayIso()}T00:00:00`);
  const sessions = sessionsForClient(clientId);
  return Array.from({ length: 7 }, (_, index) => {
    const date = toIsoDate(addDays(today, -index));
    return {
      date,
      sessions: sessions.filter((session) => session.date === date)
    };
  });
}

function workoutDayCard(day) {
  const content = day.sessions.length
    ? day.sessions
        .map((session) => `
          <div class="day-session">
            <div class="chips">${session.bodyParts.map((part) => `<span class="chip">${part}</span>`).join("") || `<span class="chip missed">No body parts</span>`}</div>
            <small class="meta">${session.exercises || session.notes || "No notes added"}</small>
          </div>
        `)
        .join("")
    : `<small class="meta">No workout logged</small>`;

  return `
    <article class="week-day ${day.sessions.length ? "trained" : ""}">
      <div class="day-date">
        <strong>${shortDate(day.date)}</strong>
        <span>${day.sessions.length ? `${day.sessions.length} log${day.sessions.length > 1 ? "s" : ""}` : "Rest / not logged"}</span>
      </div>
      <div class="day-work">${content}</div>
    </article>
  `;
}

function paymentsView() {
  const rows = state.clients
    .map((client) => {
      const payment = paymentForClient(client.id);
      const status = paymentState(payment);
      return `
        <article class="client-card">
          <div class="client-main">
            <div>
              <h4>${client.name}</h4>
              <p>${societyName(client.societyId)} · Due ${formatDate(payment?.dueDate)}</p>
            </div>
            <strong>${money(payment?.amount || client.monthlyFee)}</strong>
          </div>
          <div class="chips">
            <span class="chip ${status.className}">${status.label}</span>
            <span class="chip">${payment?.paidDate ? `Paid ${formatDate(payment.paidDate)}` : "Not received"}</span>
          </div>
          <div class="actions">
            <button class="btn primary" data-modal="payment" data-client="${client.id}">Record</button>
            <button class="btn whatsapp" data-wa="${client.id}">Remind</button>
          </div>
        </article>
      `;
    })
    .join("");

  return appChrome(`
    <div class="view-title">
      <div>
        <h2>Payments</h2>
        <p>Monthly cycle is based on each client's joining date.</p>
      </div>
    </div>
    <section class="panel">
      <div class="section-head">
        <h3>Current dues</h3>
        <small>${money(expectedThisCycle() - paidThisCycle())} pending</small>
      </div>
      <div class="client-list">${rows}</div>
    </section>
  `);
}

function financeView() {
  const societyRows = state.societies.length
    ? state.societies
    .map((society) => {
      const clients = state.clients.filter((client) => client.societyId === society.id && client.status === "Active");
      const expected = clients.reduce((sum, client) => sum + Number(client.monthlyFee || 0), 0);
      const paid = clients.reduce((sum, client) => {
        const payment = paymentForClient(client.id);
        return sum + (payment?.status === "Paid" ? Number(payment.amount || 0) : 0);
      }, 0);
      return `
        <div class="finance-row">
          <div>
            <strong>${society.name}</strong>
            <small>${clients.length} active clients · ${money(expected - paid)} pending</small>
          </div>
          <div class="amount">${money(paid)}</div>
        </div>
      `;
    })
    .join("")
    : `<div class="empty">No societies yet. Add a society to start tracking collections.</div>`;

  return appChrome(`
    <div class="view-title">
      <div>
        <h2>Finance</h2>
        <p>Collection overview by society gym.</p>
      </div>
    </div>
    <section class="panel">
      <div class="section-head">
        <h3>Society breakdown</h3>
        <button class="btn" data-modal="society">Add society</button>
      </div>
      ${societyRows}
    </section>
  `);
}

function exercisesView() {
  const selectedPart = document.querySelector("#body-filter")?.value || "All";
  const selectedLevel = document.querySelector("#level-filter")?.value || "All";
  const exercises = state.exercises.filter((exercise) => {
    return (selectedPart === "All" || exercise.bodyPart === selectedPart) && (selectedLevel === "All" || exercise.level === selectedLevel);
  });

  return appChrome(`
    <div class="view-title">
      <div>
        <h2>Exercises</h2>
        <p>Choose options by body part and experience level.</p>
      </div>
      <button class="btn primary" data-modal="exercise">Add</button>
    </div>
    <section class="panel">
      <div class="filters">
        <div class="field">
          <label>Body part</label>
          <select id="body-filter" data-filter>
            ${["All", ...bodyParts].map((part) => `<option ${part === selectedPart ? "selected" : ""}>${part}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Level</label>
          <select id="level-filter" data-filter>
            ${["All", ...levels].map((level) => `<option ${level === selectedLevel ? "selected" : ""}>${level}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="client-list">
        ${exercises
          .map(
            (exercise) => `
            <article class="client-card">
              <div class="exercise-card">
                <img class="exercise-thumb" src="${exercise.imageUrl || exerciseImages[exercise.bodyPart]}" alt="${exercise.bodyPart} reference">
                <div class="exercise-copy">
                  <div class="client-main">
                    <div>
                      <h4>${exercise.name}</h4>
                      <p>${exercise.bodyPart} · ${exercise.level}</p>
                    </div>
                    <span class="chip">${exercise.equipment}</span>
                  </div>
                  <small class="meta">${exercise.notes}</small>
                </div>
              </div>
            </article>
          `
          )
          .join("") || `<div class="empty">No exercises match this filter.</div>`}
      </div>
    </section>
  `);
}

function renderModal() {
  const title = { client: "Add client", society: "Add society", session: "Log workout", payment: "Record payment", exercise: "Add exercise", settings: "Google Sheets sync", reminder: "WhatsApp reminder" }[modal.type];
  return `
    <div class="modal-backdrop">
      <section class="modal">
        <header>
          <h3>${title}</h3>
          <button class="btn ghost" data-close>Close</button>
        </header>
        <div class="modal-body">${modalBody()}</div>
      </section>
    </div>
  `;
}

function modalBody() {
  if (modal.type === "society") {
    return `
      <form class="form-grid" data-submit="society">
        ${field("Society name", "name", "text", "", true)}
        <button class="btn primary" type="submit">Save society</button>
      </form>
    `;
  }

  if (modal.type === "client") {
    if (!state.societies.length) {
      return `
        <div class="empty">Add at least one society before adding clients.</div>
        <div class="actions" style="margin-top: 12px;">
          <button class="btn primary" data-modal="society">Add society</button>
        </div>
      `;
    }

    return `
      <form class="form-grid two" data-submit="client">
        ${field("Name", "name", "text", "", true)}
        ${field("Phone number", "phone", "tel", "", true, "10-digit India number or full country code")}
        <div class="field"><label>Society</label><select name="societyId">${state.societies.map((s) => `<option value="${s.id}">${s.name}</option>`).join("")}</select></div>
        ${field("Start date", "startDate", "date", todayIso(), true)}
        ${field("Monthly fee", "monthlyFee", "number", "3500", true)}
        <div class="field"><label>Level</label><select name="level">${levels.map((l) => `<option>${l}</option>`).join("")}</select></div>
        <div class="field"><label>Notes</label><textarea name="notes"></textarea></div>
        <button class="btn primary" type="submit">Save client</button>
      </form>
    `;
  }

  if (modal.type === "session") {
    const client = clientById(modal.clientId);
    return `
      <form class="form-grid workout-form" data-submit="session">
        <div class="workout-client">
          <strong>${client?.name || "Client"}</strong>
          <span>${client ? `${societyName(client.societyId)} · ${client.level}` : "Workout log"}</span>
        </div>
        <div class="field compact-field">
          <label>Date</label>
          <input name="date" type="date" value="${todayIso()}" required>
        </div>
        <div class="field compact-field">
          <label>Body parts</label>
          <div class="check-grid">
            ${bodyParts.map((part) => `<label class="check-pill"><input type="checkbox" name="bodyParts" value="${part}"> ${part}</label>`).join("")}
          </div>
        </div>
        <div class="field compact-field"><label>Exercises done</label><textarea class="short-textarea" name="exercises" placeholder="Bench press, rows, planks..."></textarea></div>
        <div class="field compact-field"><label>Notes</label><textarea class="short-textarea" name="notes"></textarea></div>
        <div class="modal-actions">
          <button class="btn primary" type="submit">Save workout</button>
        </div>
      </form>
    `;
  }

  if (modal.type === "payment") {
    const client = clientById(modal.clientId);
    const payment = paymentForClient(modal.clientId);
    return `
      <form class="form-grid" data-submit="payment">
        <p class="meta">${client?.name || ""} · ${money(payment?.amount || client?.monthlyFee)}</p>
        ${field("Paid date", "paidDate", "date", todayIso(), true)}
        ${field("Amount", "amount", "number", payment?.amount || client?.monthlyFee || "", true)}
        <div class="field"><label>Method</label><select name="method"><option>UPI</option><option>Cash</option><option>Bank transfer</option></select></div>
        <button class="btn primary" type="submit">Mark paid</button>
      </form>
    `;
  }

  if (modal.type === "settings") {
    return `
      <form class="form-grid" data-submit="settings">
        <div class="field">
          <label>Apps Script Web App URL</label>
          <input name="webAppUrl" type="url" value="${config.webAppUrl || ""}" placeholder="https://script.google.com/macros/s/.../exec" required>
        </div>
        <p class="meta">Paste the deployed Web App URL ending in <strong>/exec</strong>. New clients, workouts, payments, and exercises will then be sent to Google Sheets.</p>
        <div class="actions">
          <button class="btn primary" type="submit">Save and load sheet</button>
          <button class="btn" type="button" data-load-sheet>Load sheet now</button>
        </div>
      </form>
    `;
  }

  if (modal.type === "reminder") {
    return `
      <div class="form-grid">
        ${modal.error ? `<p class="notice error">${modal.error}</p>` : ""}
        <div class="field">
          <label>Message</label>
          <textarea readonly>${modal.message}</textarea>
        </div>
        <div class="actions">
          <button class="btn primary" type="button" data-copy-reminder>Copy message</button>
        </div>
      </div>
    `;
  }

  return `
    <form class="form-grid" data-submit="exercise">
      ${field("Exercise name", "name", "text", "", true)}
      <div class="field"><label>Body part</label><select name="bodyPart">${bodyParts.map((part) => `<option>${part}</option>`).join("")}</select></div>
      <div class="field"><label>Level</label><select name="level">${levels.map((level) => `<option>${level}</option>`).join("")}</select></div>
      ${field("Equipment", "equipment", "text", "Gym floor", false)}
      ${field("Reference image URL", "imageUrl", "url", "", false)}
      <div class="field"><label>Notes</label><textarea name="notes"></textarea></div>
      <button class="btn primary" type="submit">Save exercise</button>
    </form>
  `;
}

function field(label, name, type, value, required, placeholder = "") {
  return `<div class="field"><label>${label}</label><input name="${name}" type="${type}" value="${value || ""}" placeholder="${placeholder}" ${required ? "required" : ""}></div>`;
}

function normalizePhone(phone) {
  let digits = String(phone || "").replace(/\D/g, "");
  digits = digits.replace(/^0+/, "");
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
}

function reminderMessage(client, payment) {
  const amount = money(payment?.amount || client.monthlyFee);
  const dueDate = formatDate(payment?.dueDate);
  return `Hi ${client.name}, this is a reminder for your gym training fee of ${amount}, due on ${dueDate}. Please share once paid. Thank you!`;
}

function whatsappUrl(phone, message) {
  const encoded = encodeURIComponent(message);
  const desktop = !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (desktop) return `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`;
  return `https://wa.me/${phone}?text=${encoded}`;
}

async function copyReminderMessage(message) {
  try {
    await navigator.clipboard.writeText(message);
    syncStatus = "Reminder copied";
  } catch (error) {
    console.error(error);
    syncStatus = "Copy failed";
  }
  render();
}

function openWhatsApp(clientId) {
  const client = clientById(clientId);
  const payment = paymentForClient(clientId);
  const message = reminderMessage(client, payment);
  const phone = normalizePhone(client.phone);

  if (phone.length < 11) {
    modal = {
      type: "reminder",
      clientId,
      message,
      error: "Add a valid WhatsApp number. For India, 10 digits is enough; the app will add 91 automatically."
    };
    render();
    return;
  }

  window.open(whatsappUrl(phone, message), "_blank", "noopener,noreferrer");
}

function addInitialPayment(client) {
  const start = new Date(`${client.startDate}T00:00:00`);
  const due = new Date(start);
  due.setMonth(due.getMonth() + 1);
  const payment = {
    id: uid("pay"),
    clientId: client.id,
    cycleStart: client.startDate,
    dueDate: due.toISOString().slice(0, 10),
    amount: Number(client.monthlyFee || 0),
    paidDate: "",
    method: "",
    status: "Pending"
  };
  state.payments.push(payment);
  return payment;
}

function apiUrl(params = {}) {
  const url = new URL(config.webAppUrl);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

function loadSheetData() {
  if (!isSheetConnected()) return Promise.resolve();

  syncStatus = "Loading...";
  render();

  return new Promise((resolve, reject) => {
    const callbackName = `fitledgerCallback${Date.now()}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (data) => {
      cleanup();
      state = normalizeRemoteData(data);
      selectedClientId = state.clients[0]?.id || "";
      clientDetailOpen = false;
      syncStatus = "Connected";
      saveState();
      render();
      resolve();
    };

    script.onerror = () => {
      cleanup();
      syncStatus = "Load failed";
      render();
      reject(new Error("Unable to load Google Sheet data."));
    };

    script.src = apiUrl({ callback: callbackName });
    document.body.appendChild(script);
  });
}

function normalizeRemoteData(data) {
  const next = {
    societies: data.societies?.length ? data.societies : state.societies,
    clients: data.clients || [],
    payments: data.payments || [],
    sessions: data.sessions || [],
    exercises: data.exercises?.length ? data.exercises : state.exercises
  };

  next.clients = next.clients.map((client) => ({ ...client, monthlyFee: Number(client.monthlyFee || 0) }));
  next.payments = next.payments.map((payment) => ({ ...payment, amount: Number(payment.amount || 0) }));
  next.sessions = next.sessions.map((session) => ({
    ...session,
    attended: session.attended === true || String(session.attended).toLowerCase() === "true",
    bodyParts: Array.isArray(session.bodyParts) ? session.bodyParts : String(session.bodyParts || "").split(",").filter(Boolean)
  }));

  return next;
}

async function sendToSheet(action, payload) {
  if (!isSheetConnected()) return;

  syncStatus = "Saving...";
  render();

  const body = new URLSearchParams({
    payload: JSON.stringify({ action, ...payload })
  });

  try {
    await fetch(config.webAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    syncStatus = "Connected";
  } catch (error) {
    console.error(error);
    syncStatus = "Save failed";
  }
}

async function handleSubmit(form) {
  const data = new FormData(form);
  let remoteAction = "";
  let remotePayload = {};

  if (form.dataset.submit === "society") {
    const society = {
      id: uid("soc"),
      name: data.get("name")
    };
    state.societies.push(society);
    remoteAction = "createSociety";
    remotePayload = { society };
  }

  if (form.dataset.submit === "client") {
    const client = {
      id: uid("cli"),
      name: data.get("name"),
      phone: data.get("phone"),
      societyId: data.get("societyId"),
      startDate: data.get("startDate"),
      monthlyFee: Number(data.get("monthlyFee")),
      level: data.get("level"),
      status: "Active",
      notes: data.get("notes")
    };
    state.clients.push(client);
    selectedClientId = client.id;
    const payment = addInitialPayment(client);
    remoteAction = "createClient";
    remotePayload = { client, payment };
  }

  if (form.dataset.submit === "session") {
    const session = {
      id: uid("ses"),
      clientId: modal.clientId,
      date: data.get("date"),
      attended: true,
      bodyParts: data.getAll("bodyParts"),
      exercises: data.get("exercises"),
      notes: data.get("notes")
    };
    state.sessions.push(session);
    selectedClientId = modal.clientId;
    remoteAction = "logSession";
    remotePayload = { session };
  }

  if (form.dataset.submit === "payment") {
    const payment = paymentForClient(modal.clientId);
    if (payment) {
      payment.paidDate = data.get("paidDate");
      payment.amount = Number(data.get("amount"));
      payment.method = data.get("method");
      payment.status = "Paid";
      remoteAction = "recordPayment";
      remotePayload = {
        paymentId: payment.id,
        patch: {
          paidDate: payment.paidDate,
          amount: payment.amount,
          method: payment.method,
          status: payment.status
        }
      };
    }
  }

  if (form.dataset.submit === "exercise") {
    const exercise = {
      id: uid("ex"),
      bodyPart: data.get("bodyPart"),
      level: data.get("level"),
      name: data.get("name"),
      equipment: data.get("equipment"),
      notes: data.get("notes"),
      imageUrl: data.get("imageUrl") || exerciseImages[data.get("bodyPart")]
    };
    state.exercises.push(exercise);
    remoteAction = "createExercise";
    remotePayload = { exercise };
  }

  if (form.dataset.submit === "settings") {
    config.webAppUrl = String(data.get("webAppUrl")).trim();
    saveConfig();
    modal = null;
    await loadSheetData();
    return;
  }

  modal = null;
  saveState();
  if (remoteAction) await sendToSheet(remoteAction, remotePayload);
  render();
}

function render() {
  const views = { clients: clientsView, payments: paymentsView, finance: financeView, exercises: exercisesView };
  document.querySelector("#app").innerHTML = views[activeView]();
}

document.addEventListener("click", (event) => {
  const view = event.target.closest("[data-view]");
  if (view) {
    activeView = view.dataset.view;
    if (activeView !== "clients") clientDetailOpen = false;
    render();
  }

  const select = event.target.closest("[data-select-client]");
  if (select) {
    selectedClientId = select.dataset.selectClient;
    clientDetailOpen = true;
    activeView = "clients";
    window.scrollTo({ top: 0, behavior: "smooth" });
    render();
  }

  const clientBack = event.target.closest("[data-client-back]");
  if (clientBack) {
    clientDetailOpen = false;
    render();
  }

  const modalButton = event.target.closest("[data-modal]");
  if (modalButton) {
    modal = { type: modalButton.dataset.modal, clientId: modalButton.dataset.client };
    render();
  }

  const close = event.target.closest("[data-close]");
  if (close || event.target.classList.contains("modal-backdrop")) {
    modal = null;
    render();
  }

  const whatsApp = event.target.closest("[data-wa]");
  if (whatsApp) {
    openWhatsApp(whatsApp.dataset.wa);
  }

  const loadSheet = event.target.closest("[data-load-sheet]");
  if (loadSheet) {
    loadSheetData();
  }

  const copyReminder = event.target.closest("[data-copy-reminder]");
  if (copyReminder) {
    copyReminderMessage(modal.message);
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit(event.target);
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-filter]")) render();
});

render();
if (isSheetConnected()) loadSheetData();
