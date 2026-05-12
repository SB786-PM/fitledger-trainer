const SHEETS = {
  societies: "Societies",
  clients: "Clients",
  payments: "Payments",
  sessions: "Sessions",
  exercises: "Exercises",
  bodyParts: "BodyParts"
};

const HEADERS = {
  Societies: ["id", "name"],
  Clients: ["id", "name", "phone", "societyId", "startDate", "monthlyFee", "level", "status", "notes"],
  Payments: ["id", "clientId", "cycleStart", "dueDate", "amount", "paidDate", "method", "status"],
  Sessions: ["id", "clientId", "date", "attended", "bodyParts", "exercises", "notes"],
  Exercises: ["id", "bodyPart", "level", "name", "equipment", "notes", "imageUrl"],
  BodyParts: ["name"]
};

function doGet(e) {
  const data = readAllData();
  const callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    return ContentService
      .createTextOutput(callback + "(" + JSON.stringify(data) + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return jsonResponse(data);
}

function doPost(e) {
  const payloadText = e.parameter && e.parameter.payload
    ? e.parameter.payload
    : e.postData.contents || "{}";
  const payload = JSON.parse(payloadText);
  const action = payload.action;

  if (action === "createSociety") return jsonResponse(createRow(SHEETS.societies, payload.society));
  if (action === "createClient") return jsonResponse(createClient(payload.client, payload.payment));
  if (action === "recordPayment") return jsonResponse(updatePayment(payload.paymentId, payload.patch));
  if (action === "logSession") return jsonResponse(createRow(SHEETS.sessions, payload.session));
  if (action === "createExercise") return jsonResponse(createRow(SHEETS.exercises, payload.exercise));

  throw new Error("Unknown action: " + action);
}

function setupWorkbook() {
  const ss = SpreadsheetApp.getActive();
  Object.keys(HEADERS).forEach((sheetName) => {
    const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setValues([HEADERS[sheetName]]);
    sheet.setFrozenRows(1);
  });
  seedWorkbook();
}

function readAllData() {
  return {
    societies: readSheet(SHEETS.societies),
    clients: readSheet(SHEETS.clients),
    payments: readSheet(SHEETS.payments),
    sessions: readSheet(SHEETS.sessions).map((row) => ({
      ...row,
      attended: String(row.attended).toLowerCase() === "true",
      bodyParts: String(row.bodyParts || "").split(",").filter(Boolean)
    })),
    exercises: readSheet(SHEETS.exercises),
    bodyParts: readSheet(SHEETS.bodyParts).map((row) => row.name)
  };
}

function readSheet(sheetName) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  return values
    .filter((row) => row.some((cell) => cell !== ""))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, normalizeCell(row[index])])));
}

function normalizeCell(value) {
  if (Object.prototype.toString.call(value) === "[object Date]") {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return value;
}

function createClient(client, payment) {
  createRow(SHEETS.clients, client);
  if (payment) createRow(SHEETS.payments, payment);
  return { ok: true, client: client, payment: payment };
}

function createRow(sheetName, rowObject) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  const headers = HEADERS[sheetName];
  const row = headers.map((header) => Array.isArray(rowObject[header]) ? rowObject[header].join(",") : rowObject[header] || "");
  sheet.appendRow(row);
  return { ok: true, row: rowObject };
}

function updatePayment(paymentId, patch) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEETS.payments);
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idIndex = headers.indexOf("id");
  const rowIndex = values.findIndex((row, index) => index > 0 && row[idIndex] === paymentId);
  if (rowIndex === -1) throw new Error("Payment not found: " + paymentId);

  Object.keys(patch).forEach((key) => {
    const colIndex = headers.indexOf(key);
    if (colIndex !== -1) sheet.getRange(rowIndex + 1, colIndex + 1).setValue(patch[key]);
  });

  return { ok: true };
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function seedWorkbook() {
  const bodyParts = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Cardio", "Mobility"];
  const imageMap = {
    Chest: "assets/exercises/chest.svg",
    Back: "assets/exercises/back.svg",
    Legs: "assets/exercises/legs.svg",
    Shoulders: "assets/exercises/shoulders.svg",
    Arms: "assets/exercises/arms.svg",
    Core: "assets/exercises/core.svg",
    Cardio: "assets/exercises/cardio.svg",
    Mobility: "assets/exercises/mobility.svg"
  };
  const exercises = [
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
  ].map((item, index) => ({
    id: "ex-" + (index + 1),
    bodyPart: item[0],
    level: item[1],
    name: item[2],
    equipment: item[3],
    notes: item[4],
    imageUrl: imageMap[item[0]]
  }));

  bodyParts.forEach((name) => createRow(SHEETS.bodyParts, { name: name }));
  exercises.forEach((exercise) => createRow(SHEETS.exercises, exercise));
}
