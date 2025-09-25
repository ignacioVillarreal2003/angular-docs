---
title: Exmple
subtitle: Agregá capas ocultas a tu red para descubrir relaciones complejas.
order: 1
date: 9/15/2025
coverImage: img2.png
---

[[card]]
## La efectividad irrazonable de los datos

En un famoso artículo publicado en 2001, los investigadores de Microsoft Michele Banko y Eric Brill demostraron que algoritmos de Machine Learning muy diferentes, incluyendo algunos bastante simples, obtenían un rendimiento casi idéntico en un problema complejo de desambiguación de lenguaje natural una vez que se les proporcionaba suficiente cantidad de datos (como se puede ver en la Figura 1-20).

[[img:1.19.png]]
Figura 1-20. La importancia de los datos frente a los algoritmos
[[/img]]

Como lo expresaron los autores: “estos resultados sugieren que quizá queramos reconsiderar la compensación entre gastar tiempo y dinero en el desarrollo de algoritmos versus gastarlo en el desarrollo de corpus”.

La idea de que los datos importan más que los algoritmos para problemas complejos fue aún más popularizada por Peter Norvig et al. en un artículo titulado “[The Unreasonable Effectiveness of Data](https://static.googleusercontent.com/media/research.google.com/es//pubs/archive/35179.pdf)” publicado en 2009\. Sin embargo, cabe señalar que los conjuntos de datos pequeños y medianos siguen siendo muy comunes, y no siempre es fácil o barato obtener datos de entrenamiento adicionales, así que no abandones los algoritmos todavía.
[[/card]]

# Titulo 1

## Titulo 2

### Titulo 3

#### Titulo 4

- Lista
- Lista
    - Lista
    - Lista
- Lista

---

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

[[img:image-1.png]]
Un texto para abajo 
$$
input\_shape = [num\_columns]
$$
[[/img]]

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

```python
from tensorflow import keras
from tensorflow.keras import layers

# Crear una red con 1 unidad lineal
model = keras.Sequential([
    layers.Dense(units=1, input_shape=[3])
])
```

$$
input\_shape = [num\_columns]
$$

[[img:image-1.png]]
Un texto para abajo
[[/img]]

> Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.

[[card]]
Recordá normalizar los datos antes de entrenar la red.
[[/card]]

> ### Título dentro de cita
>
> - Punto 1
> - Punto 2
>
> Código:
> ```js
> console.log("Hola");
> ```