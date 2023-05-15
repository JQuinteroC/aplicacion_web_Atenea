# Aplicacion web Atenea
Proyecto para diploma de desarrollo web Universidad Sergio Arboleda - Atenea - Alcaldía de Bogotá

## Ejecución en entorno local
```
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Ejecución en producción
```
mvn clean package -DskipTests

cd /home/opc/aplicacion_web_Atenea/target

sudo java -jar -Dspring.profiles.active=prod grupog1-0.0.1-SNAPSHOT.jar
```
