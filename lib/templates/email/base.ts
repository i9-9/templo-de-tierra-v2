interface BaseTemplateProps {
  content: string;
  logoCid: string;
}

const baseTemplate = ({ content, logoCid }: BaseTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Templo de Tierra</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #F5DC90;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 0;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            text-align: center;
            padding: 30px 20px;
            background-color: #F5DC90;
            color: #6F4C21;
          }
          .logo {
            max-width: 200px;
            height: auto;
            margin-bottom: 20px;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
          .content {
            padding: 30px;
            background-color: white;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background-color: #F5DC90;
            color: #6F4C21;
            font-size: 14px;
            border-top: 1px solid #6F4C21;
          }
          .footer a {
            color: #6F4C21;
            text-decoration: none;
            font-weight: bold;
          }
          .details-box {
            background-color: #F5DC90;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .details-box h3 {
            color: #6F4C21;
            margin-top: 0;
            margin-bottom: 15px;
          }
          .details-box p {
            margin: 10px 0;
          }
          .status {
            font-weight: bold;
            margin-top: 15px;
          }
          .status.confirmada {
            color: #4CAF50;
          }
          .status.cancelada {
            color: #f44336;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
              margin: 0;
              border-radius: 0;
            }
            .content {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="cid:${logoCid}" alt="Templo de Tierra" class="logo">
            <h1 style="margin: 0; font-size: 24px;">Templo de Tierra</h1>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Templo de Tierra. Todos los derechos reservados.</p>
            <p>Si tienes alguna pregunta, contáctanos a <a href="mailto:templodetierra.ashram@gmail.com">templodetierra.ashram@gmail.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export { baseTemplate }; 