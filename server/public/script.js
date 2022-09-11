const button = document.querySelector("button");
button.addEventListener("click", () => {
    console.log("Checkout");
    fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 1 },
            ],
        }),
    })
        .then((res) => {
            console.log(res)
            if (res.ok) return res.json();
            return res.json().then((json) => Promise.reject(json));
        })
        .then((data) => {
            console.log(`data: ${JSON.stringify(data)}`);
            // console.log(`url: ${url}`)
            // window.location = url;
        })
        .catch((err) => {
            console.error(err.error);
        });
});
