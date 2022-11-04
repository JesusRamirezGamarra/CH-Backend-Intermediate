# CH-Backend-Intermediate
Backend de un eCommerce 
<p align="center">
  <p align="center">    
    <img src="https://github.com/JesusRamirezGamarra/signature/blob/main/public/img/Logo_Negro.png" alt="BFFs" height="250">    
  </p>
  <p align="center">
       CoderHouse - Backend
  </p>
</p>

# CH-Backend-Intermediate
Backend de un eCommerce 


## Se debe entregar:

* Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro. 

  - El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.

  - La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.

* Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.

  - El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.

  - Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

* Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

  - El usuario iniciará la acción de pedido en la vista del carrito.

  - Será enviado una vez finalizada la elección para la realizar la compra de productos.

  - El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.

  - El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.


## Aspectos a incluir:

* El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
* Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
* Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log * tendrá además como destino un archivo elegido.
* Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.

Nota  : 

[ver mas](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

The overall flow of Gitflow is:

1. A `develop` branch is created from `main`
2. A release branch is created from `develop`
3. `Feature` branches are created from `develop`
4. When a `feature` is complete it is merged into the `develop` branch
5. When the `release` branch is done it is merged into `develop` and `main`
6. If an issue in `main` is detected a `hotfix` branch is created from `main`
7. Once the `hotfix` is complete it is merged to both develop and `main`


- La rama `Main` ( antes `Master`), es el branch inicial.
- la rama `develop` o `DEV`, es el branch utilizado por el desarrollador 1 `DEV/[Nombre]` para implementar nuevas funcionalidades requeridas.
- La rama `Hotfix` o `fix/[Error]`, que habitualmente se utiliza para código para depurar el código que venga de producción, por haberse detectado un defecto crítico en producción que deba resolverse, al que se le va a hacer una Release puntual para corregirlo.
- La rama `Feature`, para nuevas características, nuevos requisitos o nuevas historias de usuario.
- La rama `Release`, para estandarizar o cortar una serie de código que ha estado desarrollándose en la rama Develop, se saca una rama de este tipo, se mergea y ahí se depura.

- `pr` o `pull request` : significa «Petición de validación». Simplificándolo al máximo, un pull request es la acción de someter a validación un código que va a fusionarse (o hacer un 'merge', como se suele decir en el mundo de la informática) de una rama a otra.

Curiosidad : 

El movimiento de #BlackLivesMatter ha ayudado a que GitHub sustituya algunas palabras usadas en su plataforma con relación al racismo.
Palabras como master, whitelist, blacklist y slave se encuentran en este proceso de cambio. Pero el más importante en ese momento y que ya ha empezado a tener efecto es que la rama master ahora se llamará main.