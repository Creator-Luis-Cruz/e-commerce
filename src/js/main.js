import { UserService } from "../services/user.service.js";

$(document).ready(function () {
    $('#header-container').load('partials/header.html');

    function loadPage(pageName, callback) {
        $('#root').load(pageName, function (response, status, xhr) {
            if (status === "error") {
                console.error("Error cargando vista:", xhr.status, xhr.statusText);
                $("#root").html("<div class='alert alert-danger'>No se pudo cargar la vista: " + pageName + "</div>");
            } else {
                console.log("Vista " + pageName + " cargada con éxito.");
                if (callback) callback();
            }
        });
    }

    function loadData() {
        $("#table_view").show();
        UserService.getUsers()
            .done(function (products) {
                loadProducts(products);
            })
            .fail(err => console.error("Error API:", err));
    }

    $('#btn-search').on('click', function () {

        const searchTerm = $("#search-input").val().toLowerCase();

        console.log("Buscando:", searchTerm);
        if (searchTerm.trim() === "") {
            alert("Por favor escribe algo para buscar");
            return;
        }
        UserService.searchByTitleService(searchTerm).done(function (products) {
            loadProducts(products);
        }).fail(function (error) {
            console.error("Error en la búsqueda", error);
        });
    });

    function loadProducts(products) {
        if (products.length === 0) {
            alert("Ninguna coincidencia encontrada");
            $("#search-input").val("");
            return;
        }
        console.log(products);
        const container = $('#productos-container');
        container.empty();

        products.forEach(item => {
            const mainImage = item.image;

            container.append(`
                        <div class="col">
                            <div class="card product-card shadow-sm border-0">
                                <span class="badge bg-info text-dark category-badge">${item.category}</span>
                                <img src="${mainImage}" class="card-img-top product-img" alt="${item.title}">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title text-truncate">${item.title}</h5>
                                    <p class="card-text text-muted small flex-grow-1">
                                        ${item.description.substring(0, 100)}...
                                    </p>
                                    <div class="d-flex justify-content-between align-items-center mt-3">
                                        <span class="fs-4 fw-bold text-primary">$${item.price}</span>
                                        <button class="btn btn-outline-dark btn-sm rounded-pill">Ver Detalles</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
        });
    }

   $(document).on('click', '.goToView', function (e) {
    e.preventDefault();
    const $this = $(this);
    const page = $this.data('page');
    
    if (page) {
        loadPage(page, function() {
            if (page === "catalogo.html") loadData();
        });
        $('.navbar-nav .nav-link').removeClass('active');
        if ($this.hasClass('nav-link')) {
            $this.addClass('active');
        } else {
            $(`.navbar-nav .nav-link[data-page="${page}"]`).addClass('active');
        }
    }else{
        $("#header").hide();
        loadPage('noDisponible.html')
    }
});

    loadPage('home.html');
    loadData();
});