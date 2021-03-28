let buttonsArray = Array.from(document.querySelectorAll('.deletebtn'));
console.log('bruh');

buttonsArray.forEach(el => {
    el.addEventListener('click', async function(){
        let bandName = (this.parentNode.childNodes[1].innerText);
        const res = await fetch('/delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: bandName
            })
        });
        const data = await res.json();
        console.log(data);
        location.reload();
    });
})