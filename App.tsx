/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import Amplify, { Auth, Hub } from 'aws-amplify';
import React, { useEffect } from 'react';
import {
  Button, SafeAreaView,
  StatusBar
} from "react-native";
import awsconfig from './src/aws-exports';
//Amplify tarafından oluşturulan dosyalar ile kütüphanelerin ayarlarmarlını yapıyoruz.
Amplify.configure(awsconfig);

const App = () => {


  useEffect(() => {
    //Component açıldığında Hub nesnesi ile kimlik doğrulama mesajlarını dinlemeye başlıyoruz.
    //Kullanıcı giriş yaptığında ve çıkış yaptığında uygulamamızın bundan haberi olacak.
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log(data)
          break;
        case "signOut":
          console.log("Kullanıcı çıkış yaptı.")
          break;
      }
    });

    //Giriş yapmış olan kullanıcının bilgilerini bu şekilde alabilirsiniz.
    Auth.currentAuthenticatedUser()
      .then(user => console.log(user))
      .catch(() => console.log("Not signed in"));
  })



  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* Uygulama üzerinde çıkacak buton ile Auth nesnesinin sağladığı fonksiyonu çağırarak Google ile giriş yapmak için gerekli ekranı açıyoruz. */}
        {/*//@ts-ignore //Typescript saçma bir şekilde syntax hatası verdiği için kullandım.*/}
        <Button onPress={(e) => Auth.federatedSignIn({ provider: 'Google' })} title="Open Google"></Button>
      </SafeAreaView>
    </>
  );
};

export default App;
