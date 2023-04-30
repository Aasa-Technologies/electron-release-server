/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/datastores.js and config/models.js )            *
   ***************************************************************************/

  models: {
    datastore: 'postgresql',
    migrate: 'safe'
  },
  
  hookTimeout: 400000,

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  port: 4545,
	
/*  sails: {
    config: {
      appUrl: 'https://updates.proer.io/'
    }
  },
  */
   /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

  // auth: {
  //   secret: 'temppass'
  // }
  sockets: {
	  onlyAllowOrigins: ["https://updates.proer.io", "https://www.updates.proer.io","http://updates.proer.io", "http://www.updates.proer.io","http://updates.proer.io:4545", "http://www.updates.proer.io:4545","http://localhost","http://127.0.0.1"]
 /* beforeConnect: function(handshake, proceed) {
    // your beforeConnect logic here
    return proceed(null, true);
  }
*/
  },
  
//   session: {
//     cookie: {
//       secure: true
//     }
//   }
  

};
