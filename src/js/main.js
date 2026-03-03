
$(document).ready(function() {
    
     // Función para cambiar de vista
     function loadPage(pageName) {
        $('#content-area').load(pageName, function(response, status, xhr) {
            if (status == "error") {
                $("#content-area").html("<h2>Error al cargar la página</h2>");
            }
        });
    }
    
    $('#btn-cargar').on('click', function() {
        // Llamamos al servicio
        UserService.getUsers();
    });
   

    // Cargar home por defecto al iniciar
    loadPage('home.html');

    // Manejar clics en la navegación
    $('.nav-link').on('click', function() {
        const page = $(this).data('page');
        loadPage(page);
    });
});