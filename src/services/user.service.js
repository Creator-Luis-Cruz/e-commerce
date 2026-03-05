export const UserService = {
    api : 'https://api.escuelajs.co',
    allProducts: '/api/v1/products',
    searchByTitle : '/api/v1/products/?title=',

    getUsers: function() {
        console.log("Iniciando petición a la API...");
        
        return $.ajax({
            url: "https://fakestoreapi.com/products",
            method: 'GET',
            dataType: 'json'
        });
    },

    searchByTitleService: function(productData) {
        return $.ajax({
            url: this.api+this.searchByTitle+productData,
            method: 'GET',
            contentType: 'application/json',
            data: 'json'
        });
    }
};