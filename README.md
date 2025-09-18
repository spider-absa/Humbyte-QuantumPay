# Humbyte-QuantumPay
QuantumPay 

QuantumPay es una aplicación web que actúa como puente entre usuarios y la red Interledger, permitiendo realizar pagos mediante códigos QR y autorización directa en wallets compatibles con Open Payments.
La aplicación no almacena fondos ni actúa como wallet, únicamente facilita la conexión entre el emisor y el receptor de un pago.

¿Cual es el problema? 
En la actualidad, los métodos de pago digitales presentan limitaciones relacionadas con la seguridad, la interoperabilidad entre diferentes plataformas y la experiencia de usuario al momento de realizar transacciones. Muchas aplicaciones requieren procesos complejos o dependen de sistemas cerrados que dificultan la adopción en negocios pequeños o en usuarios sin acceso a servicios financieros tradicionales.
Por ello, surge la necesidad de implementar un sistema más accesible, seguro y universal que permita a las personas realizar pagos de forma rápida y confiable, utilizando tecnologías abiertas como códigos QR y protocolos de Interledger (OpenPayments), que garantizan compatibilidad entre distintas billeteras digitales sin depender de una sola entidad centralizada.
¿Que tecnología usaran? 
Tecnologías utilizadas
Frontend (interfaz web)


HTML5 → estructura de la aplicación web.


CSS / TailwindCSS → diseño y estilo visual responsivo.


JavaScript → lógica de la aplicación, generación y lectura de códigos QR, consumo de APIs.
     2. Backend (servidor)
Node.js + Express → servidor ligero para gestionar las peticiones.


Axios / Fetch API → comunicación entre la aplicación y el wallet mediante APIs REST.


Interledger Protocol (ILP) / Open Payments APIs → protocolos para la creación de clientes, autorización de pagos y transferencias seguras.
     3. Extras 
QR Code Library (qrcode.js o similar) → para generar y escanear códigos QR.


Wallet Interledger Test → billetera de prueba que se integra como emisor/receptor.
 





¿Cuál es la solución?

1. El Componente Físico (Lo que ve el usuario): Un Código QR Dinámico
¿Qué es? Un código QR generado en la app del comercio para cada transacción. A diferencia de uno estático (que siempre apunta a la misma cuenta), este contiene información única: el monto exacto a pagar y la solicitud de pago específica.
¿Cómo es la solución? Elimina la necesidad de terminales Point-of-Sale (POS) costosas, tarjetas plásticas o efectivo. Es universal y cualquier smartphone con cámara puede interactuar con él.

2. El Componente de Software (La Plataforma): La App y el Backend

Para el Comercio: Una aplicación simple (web o móvil) donde el comercio ingresa el monto de la venta y genera al instante el código QR para que el cliente lo escanee.
Para el Cliente: No necesita la app de QuantumPay. Solo necesita su billetera digital habitual (si esta es compatible con el estándar Open Payments) para escanear el código y aprobar el pago.
El Backend (Node.js): El cerebro invisible. Es el responsable de crear las solicitudes de pago, comunicarse con los protocolos y confirmar las transacciones.

3. El Componente Protocolario (El "Cómo" funciona): Open Payments + Interledger
Esta es la verdadera innovación y lo que diferencia a QuantumPay de una solución de QR tradicional.

Paso 1: Open Payments (La Solicitud)
Cuando el comercio genera el QR, nuestro backend (Node.js) usa la API de Open Payments para crear un "Incoming Payment" (una solicitud de pago única) en el servidor del comercio.
El QR contiene un enlace a esta solicitud.
Paso 2: Open Payments (La Cotización y Autorización)
La billetera del cliente escanea el QR, lee la solicitud y pide a nuestro backend una "Quote" (una cotización que confirma el monto y la dirección de destino).
El cliente autoriza el pago en su billetera.
Paso 3: Interledger (La Ejecución)
Una vez autorizado, el pago se envía. Interledger (ILP) actúa como el "correo electrónico" para el dinero.
ILP se encarga de encontrar la ruta más eficiente entre la cuenta del cliente y la del comercio, incluso si están en diferentes bancos, usando diferentes monedas o son diferentes tipos de proveedores financieros.
Resultado: El dinero se transfiere de forma instantánea y con costos ínfimos.

Diagrama del Flujo de la Solución






























¿Cuáles son los beneficios?

El proyecto ofrece diversos beneficios que lo hacen una propuesta atractiva y viable dentro del ámbito de los pagos digitales. En primer lugar, brinda mayor rapidez y accesibilidad al permitir que las transacciones se realicen de manera inmediata mediante el uso de códigos QR, evitando procesos largos o la necesidad de ingresar información manual. A su vez, garantiza la interoperabilidad, ya que se apoya en el protocolo abierto de Interledger/Open Payment.

Finalmente, el sistema es escalable y flexible, dado que no utiliza direcciones fijas, sino dinámicas, lo que facilita integrar nuevos emisores y receptores conforme crezca la aplicación. De esta manera, el proyecto no solo resuelve un problema actual de interoperabilidad y simplicidad en los pagos, sino que también sienta las bases para el desarrollo de aplicaciones más completas que impulsen la inclusión financiera digital.


¿Cuál es su arquitectura/stack simple?

1. Frontend (Capa de Presentación - Lo que el usuario ve y toca)

Tecnología: React.js (o un framework similar como Vue.js o Svelte).
Función: Es la interfaz web o móvil que usan los comercios.
Componentes Clave:
Panel de Control: Donde el comercio ingresa el monto a cobrar.
Generador de Códigos QR: Un componente que toma los datos del backend y genera un código QR dinámico en la pantalla.
Característica: Es una Single-Page Application (SPA) que se comunica con el backend mediante APIs, making it fast and responsive.

2. Backend (Capa de Lógica y Datos - El cerebro de la operación)
Tecnología: Node.js con el framework Express.js.
Función: Actúa como el intermediario entre el frontend, los protocolos de pago y la base de datos. Es donde ocurre toda la magia.
Componentes Clave:
Servidor Web: Maneja las peticiones HTTP del frontend.
API RESTful: Expone endpoints para crear pagos, verificar estados, etc.
Cliente de Open Payments: Utiliza librerías JavaScript para interactuar con la API de Open Payments (crear incoming payments, generar quotes).
Conector Interledger (ILP): El módulo que se conecta a la red Interledger para enviar y recibir fondos.
Base de Datos: Una base de datos como PostgreSQL o MongoDB para guardar información de transacciones y comercios.

3. Infraestructura y Protocolos 

Hosting/Cloud: Un servidor desarrollado en JavaScript
Protocolos (El Corazón del Sistema):
Open Payments API: El estándar abierto que define cómo se solicitan, cotizan y autorizan los pagos.
Protocolo Interledger (ILP): La "red de transporte" que mueve el dinero de forma estandarizada y interoperable entre diferentes ledgers (cuentas).

¿Qué funciones son indispensables? 

Funciones Indispensables para el Comercio

Registro y Onboarding:
Crear una cuenta con información básica (nombre, email, teléfono).
Vincular una cuenta bancaria o billetera digital para recibir los fondos.
Dashboard Principal:
Generar QR de Pago: Un botón o campo claro para ingresar un monto y generar instantáneamente un código QR dinámico.
Monto a pagar: Seleccionar el monto de pago.
Historial de Transacciones:
Una lista clara de todas las transacciones realizadas.
Filtros por fecha, monto y estado (exitosa, pendiente, fallida).
Detalles de cada transacción (fecha, hora, monto, ID de la transacción).
Notificaciones en Tiempo Real:
Una alerta audible o visual inmediata (en la web app) cuando un pago se haya recibido exitosamente. Esto es CRÍTICO para la confianza del comercio.

Funciones Indispensables para el Cliente

Escanear el Código QR: La cámara de su billetera digital debe poder leer el QR dinámico de QuantumPay.
Autorizar el Pago: Ver el monto y el destinatario del pago en su app de billetera y confirmar la transacción.
Recibir Comprobante: Obtener una confirmación digital del pago dentro de su propia billetera.

Funciones Indispensables del Sistema (Backend/Protocolos)

Estas son las funciones técnicas que deben funcionar a la perfección para que la experiencia del usuario sea posible:

Gestión de Claves API (Open Payments): Generar y gestionar de forma segura las claves de API necesarias para autenticar todas las solicitudes.
Creación de "Incoming Payments": Al generar un QR, el backend debe crear con éxito una solicitud de pago entrante en el servidor del proveedor del comercio.
Generación de "Quotes": Cuando una billetera escanea el QR, el backend debe ser capaz de proporcionar una cotización exacta y válida para ese pago específico.
Ejecución y Verificación de Pagos: El sistema debe monitorizar la red Interledger para confirmar que un pago se ha realizado con éxito y actualizar el estado de la transacción y el saldo del comercio en consecuencia.

¿Quién será responsable de construir qué parte?
La construcción del sistema se dividirá en diferentes áreas para garantizar un desarrollo ordenado y eficiente.
Frontend (Interfaz de usuario web/app):
 Responsable de diseñar y programar la interfaz gráfica donde el usuario podrá escanear códigos QR, ingresar direcciones de wallets y visualizar el flujo de pagos.


Backend (Servidor y lógica de pagos):
 Encargado de implementar la comunicación con el protocolo Interledger/Open Payments, manejar la creación de transacciones, generar las cotizaciones y gestionar la autorización de pagos mediante OAuth 2.0.

Documentación y coordinación:
 Responsable de elaborar los manuales de uso, el README del proyecto y coordinar el trabajo en equipo para que todas las partes estén alineadas.

Este proyecto fue realizado por un equipo de 4 integrantes, con una división clara de roles para optimizar el desarrollo.
Backend (Absalón y David): Encargados de la lógica de negocio, integración con las APIs de Interledger/Open Payments, gestión de la autorización de pagos, configuración de claves privadas y creación del servidor que conecta las billeteras.


Frontend (Gael y Eduardo): Responsables de la interfaz gráfica, diseño de la aplicación, implementación de la lectura/generación de códigos QR y la experiencia de usuario al realizar un pago.


De esta manera, el trabajo en equipo permitió integrar la capa visual con la lógica de pagos, asegurando que el sistema funcione de forma práctica y segura.


QuantumPay  

QuantumPay is a web application that acts as a bridge between users and the Interledger network, enabling payments via QR codes and direct authorization through wallets compatible with Open Payments.  
The application does not store funds or function as a wallet; it solely facilitates the connection between the sender and receiver of a payment.  

What is the problem?

Currently, digital payment methods face limitations related to security, interoperability between different platforms, and the user experience during transactions. Many applications require complex processes or depend on closed systems, making adoption difficult for small businesses or users without access to traditional financial services.  
Thus, there is a need to implement a more accessible, secure, and universal system that allows people to make payments quickly and reliably, using open technologies like QR codes and Interledger protocols (Open Payments). These ensure compatibility across different digital wallets without relying on a single centralized entity.  

What technology will be used?
Technologies Used
Frontend (Web Interface)
HTML5 → Application structure.
CSS / TailwindCSS → Responsive visual design and styling.
JavaScript → Application logic, QR code generation and reading, API consumption.
Backend (Server)
Node.js + Express → Lightweight server for handling requests.
Axios / Fetch API → Communication between the application and the wallet via REST APIs.
Interledger Protocol (ILP) / Open Payments APIs → Protocols for creating clients, authorizing payments, and secure transfers.
Extras
QR Code Library (e.g., qrcode.js) → For generating and scanning QR codes.
Interledger Test Wallet → Test wallet integrated as sender/receiver.
What is the solution?
The Physical Component (What the User Sees): A Dynamic QR Code
What is it? A QR code generated in the merchant’s app for each transaction. Unlike a static code (which always points to the same account), it contains unique information: the exact amount to be paid and the specific payment request.
How does it solve the problem? It eliminates the need for expensive Point-of-Sale (POS) terminals, plastic cards, or cash. It is universal, and any smartphone with a camera can interact with it.
The Software Component (The Platform): The App and Backend
For the Merchant: A simple web or mobile application where the merchant enters the sale amount and instantly generates a QR code for the customer to scan.
For the Customer: No need for the QuantumPay app. They only need their habitual digital wallet (if compatible with the Open Payments standard) to scan the code and approve the payment.
The Backend (Node.js): The invisible brain. It is responsible for creating payment requests, communicating with protocols, and confirming transactions.
The Protocol Component (The "How" It Works): Open Payments + Interledger
This is the true innovation that differentiates QuantumPay from a traditional QR solution.
Step 1: Open Payments (The Request)
When the merchant generates the QR, our backend (Node.js) uses the Open Payments API to create an "Incoming Payment" (a unique payment request) on the merchant’s server.
The QR contains a link to this request.
Step 2: Open Payments (The Quote and Authorization)
The customer’s wallet scans the QR, reads the request, and asks our backend for a "Quote" (a real-time confirmation of the amount and destination).
The customer authorizes the payment in their wallet.
Step 3: Interledger (The Execution)
Once authorized, the payment is sent. Interledger (ILP) acts as the "email for money."
ILP finds the most efficient route between the customer’s account and the merchant’s, even if they are with different banks, use different currencies, or are different types of financial providers.
Result: Money is transferred instantly and at minimal cost.
What are the benefits?
The project offers several benefits that make it an attractive and viable proposal in the digital payments space. Firstly, it provides greater speed and accessibility by allowing transactions to be carried out instantly using QR codes, avoiding lengthy processes or the need to manually enter information. It also ensures interoperability, as it relies on the open Interledger/Open Payments protocol.
Finally, the system is scalable and flexible, as it uses dynamic rather than fixed addresses, making it easy to integrate new senders and receivers as the application grows. In this way, the project not only solves a current problem of interoperability and simplicity in payments but also lays the foundation for the development of more comprehensive applications that promote digital financial inclusion.
What is its simple architecture/stack?
Frontend (Presentation Layer – What the User Sees and Interacts With)
Technology: React.js (or a similar framework like Vue.js or Svelte).
Function: The web or mobile interface used by merchants.
Key Components:
Dashboard: Where the merchant enters the amount to be charged.
QR Code Generator: A component that takes data from the backend and generates a dynamic QR code on the screen.
Feature: It is a Single-Page Application (SPA) that communicates with the backend via APIs, making it fast and responsive.
Backend (Logic and Data Layer – The Brain of the Operation)
Technology: Node.js with the Express.js framework.
Function: Acts as the intermediary between the frontend, payment protocols, and the database. This is where all the magic happens.
Key Components:
Web Server: Handles HTTP requests from the frontend.
RESTful API: Exposes endpoints for creating payments, checking statuses, etc.
Open Payments Client: Uses JavaScript libraries to interact with the Open Payments API (creating incoming payments, generating quotes).
Interledger Connector (ILP): The module that connects to the Interledger network to send and receive funds.
Database: A database like PostgreSQL or MongoDB to store transaction and merchant information.
Infrastructure and Protocols
Hosting/Cloud: A server developed in JavaScript.
Protocols (The Heart of the System):
Open Payments API: The open standard that defines how payments are requested, quoted, and authorized.
Interledger Protocol (ILP): The "transport network" that moves money in a standardized and interoperable way between different ledgers (accounts).
What functions are essential?
Essential Functions for the Merchant
Registration and Onboarding:
Create an account with basic information (name, email, phone number).
Link a bank account or digital wallet to receive funds.
Main Dashboard:
Generate Payment QR: A clear button or field to enter an amount and instantly generate a dynamic QR code.
Amount to Pay: Select the payment amount.
Transaction History:
A clear list of all transactions conducted.
Filters by date, amount, and status (successful, pending, failed).
Details of each transaction (date, time, amount, transaction ID).
Real-Time Notifications:
An immediate audible or visual alert (in the web app) when a payment is successfully received. This is CRITICAL for merchant trust.
Essential Functions for the Customer
Scan the QR Code: The camera of their digital wallet must be able to read the dynamic QR code from QuantumPay.
Authorize the Payment: View the amount and recipient of the payment in their wallet app and confirm the transaction.
Receive a Receipt: Obtain a digital confirmation of the payment within their own wallet.
Essential System Functions (Backend/Protocols)
These are the technical functions that must work perfectly for the user experience to be possible:
API Key Management (Open Payments): Generate and securely manage the API keys needed to authenticate all requests.
Creation of "Incoming Payments": When generating a QR, the backend must successfully create an incoming payment request on the merchant’s provider server.
Generation of "Quotes": When a wallet scans the QR, the backend must be able to provide an exact and valid quote for that specific payment.
Payment Execution and Verification: The system must monitor the Interledger network to confirm that a payment has been successfully completed and update the transaction status and the merchant’s balance accordingly.
Who will be responsible for building which part?
The system construction will be divided into different areas to ensure orderly and efficient development.
Frontend (Web/App User Interface):
Responsible for designing and programming the graphical interface where users can scan QR codes, enter wallet addresses, and visualize the payment flow.
Backend (Server and Payment Logic):
Tasked with implementing communication with the Interledger/Open Payments protocol, handling transaction creation, generating quotes, and managing payment authorization via OAuth 2.0.
Documentation and Coordination:
Responsible for creating user manuals, the project README, and coordinating teamwork to ensure all parts are aligned.
This project was carried out by a team of 4 members, with a clear division of roles to optimize development.
Backend (Absalón and David):
In charge of business logic, integration with Interledger/Open Payments APIs, payment authorization management, private key configuration, and creating the server that connects wallets.
Frontend (Gael and Eduardo):
Responsible for the graphical interface, application design, implementation of QR code reading/generation, and the user experience when making a payment.
In this way, teamwork enabled the integration of the visual layer with payment logic, ensuring the system functions practically and securely.
