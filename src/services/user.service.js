// Usamos 'export' para poder usarlo en otros archivos
export const UserService = {
    baseUrl: 'https://jsonplaceholder.typicode.com',

    // Método para obtener usuarios
    getUsers: function() {
        console.log("Hola mundo")
    },

    // Método para crear un usuario
    createUser: function(userData) {
        return $.ajax({
            url: `${this.baseUrl}/users`,
            method: 'POST',
            data: userData
        });
    }
};