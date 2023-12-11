import EncryptRsa from 'encrypt-rsa';

const RSAFun = () => {    
    const eRsa = new EncryptRsa();
 
     const privateKey=`-----BEGIN RSA PRIVATE KEY-----
     MIICXQIBAAKBgQCrnTBD+RrgeHAx2epRRU2i81bzQ/LMO8hwsoiOism/i9Mm0aVU
     e7gzHQY9bP1/jM8UjX3GWrTB5Ejxk3SEcqz5QFFgo99V5GXhUjMvjkkO93hZ56La
     YfBeN90u2fYXsqkgi0ObdvbIWxXmMwqK9GMHa+mOyD6AkoBQ7Erp+7hmOQIDAQAB
     AoGAISlmwjvIrceYJontdXbm4a4UBz4CFOUYfm6BZMn84j6qtr2cLQ8bMQVSx1vg
     QF19RoNw4nt0omLylXvg8BcYxV/De9/8qAQdbfT0TcxFQkhbRwOcl0IhMgiZXYdv
     IWJuO+vEjA22NvB76LzscDa0K6LtUaeVYcZD/hibkXgAoAECQQDs380+8r3OU5gh
     8x4fRa6bTFuldtGCbMb3Yize1YNvRzF1JLj0b4cl/byVVljf161Vj4U4tcorMtGQ
     AYPkMmqBAkEAuXh0wmL4xzRd1xkJ0j8UZpI2PEb7zL7bdfDGxqLoUz0YciD9ogR+
     Ci50eYk8h0aTB8caw/NB5ISOJUTUJlvvuQJBAKXC//h7GkRWz3GClqO/ua7HwqKK
     AZdJ0/quY0QVGoM2yO93IU889NCrPdsrr8oFPjFP3CSRYsbUKz6hMNDyTwECQQCI
     Aqm9E09U5jYa0yW8pL2VKovTUEq/LwdJSjS63iR5RkhzCXZ2Jc04MjEAH3/fxAV2
     orAiGnWr2vlSo1LgfnMhAkAT2soFDufiORqIcJEKu8xaqSt63YKx/LhIRDaCJuT/
     S6kYdrj0Fe1Cvrff9GdPeH37mTjMy/9QXLDZMnIA18R8
     -----END RSA PRIVATE KEY-----`;
     const publicKey=`-----BEGIN PUBLIC KEY-----
     MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrnTBD+RrgeHAx2epRRU2i81bz
     Q/LMO8hwsoiOism/i9Mm0aVUe7gzHQY9bP1/jM8UjX3GWrTB5Ejxk3SEcqz5QFFg
     o99V5GXhUjMvjkkO93hZ56LaYfBeN90u2fYXsqkgi0ObdvbIWxXmMwqK9GMHa+mO
     yD6AkoBQ7Erp+7hmOQIDAQAB
     -----END PUBLIC KEY-----`;
      
    const encryptedText = eRsa.encryptStringWithRsaPublicKey({ 
        text: 'hello world',   
        publicKey,
      });
      console.log(encryptedText);


      const decryptedText = eRsa.decryptStringWithRsaPrivateKey({ 
        text: encryptedText, 
        privateKey
      });
      console.log(decryptedText);

}

export default RSAFun;


