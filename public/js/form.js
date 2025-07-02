document.getElementById("kit-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = {
    fullname: formData.get("fullname"),
    email: formData.get("email"),
  };

  const res = await fetch("/send-kit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.success) alert("Kit sent! Check your email 📩");
  else alert("Something went wrong.");
});
