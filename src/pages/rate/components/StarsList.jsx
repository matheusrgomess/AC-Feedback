export default function StarsList() {
    var stars = document.querySelectorAll('.star-icon');

    document.addEventListener('click', function (e) {
        var classStar = e.target.classList;
        if (!classStar.contains('ativo')) {
            stars.forEach(function (star) {
                star.classList.remove('ativo');
            });
            classStar.add('ativo');
            console.log(e.target.getAttribute('data-avaliacao'));
        }
    });

    return (
        <ul class="avaliacao">
            <li class="star-icon ativo" data-avaliacao="1"></li>
            <li class="star-icon" data-avaliacao="2"></li>
            <li class="star-icon" data-avaliacao="3"></li>
            <li class="star-icon" data-avaliacao="4"></li>
            <li class="star-icon" data-avaliacao="5"></li>
        </ul>
    )
}