const bookTable = document.querySelector('#livros') 
bookTable.addEventListener('click', function(event){
    event.preventDefault();
    let elementTriggered = event.targetElement;

    if(elementTriggered.dataset.type == "remocao"){
        let bookId = elementTriggered.dataset.ref;

        fetch(`http://localhost:3000/livros/${bookId}`, { method: Delete })
        .then(resposta => {
            let tr = elementTriggered.closest(`#livro_${bookId}`);
            tr.remove();
        })
        .catch(err => {
            console.log(err);
            return 1;
        });
    }
})