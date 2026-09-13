const form = document.getElementById("issueForm");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const issue = document.getElementById("issue").value;
    const description = document.getElementById("description").value;

    try {
        const response = await fetch("http://localhost:3000/api/issues", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                issue: issue,
                description: description
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Issue saved successfully!");
            form.reset();
        } else {
            alert("Failed to save issue.");
            console.log(data);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Cannot connect to backend.");
    }
});