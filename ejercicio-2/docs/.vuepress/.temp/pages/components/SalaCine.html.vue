<template><div><h1 id="salacine" tabindex="-1"><a class="header-anchor" href="#salacine"><span>SalaCine</span></a></h1>
<h2 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h2>
<table>
<thead>
<tr>
<th>Prop name</th>
<th>Description</th>
<th>Type</th>
<th>Values</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>filas</td>
<td>Número de filas de butacas en la sala</td>
<td>number</td>
<td>-</td>
<td></td>
</tr>
<tr>
<td>columnas</td>
<td>Número de butacas por cada fila</td>
<td>number</td>
<td>-</td>
<td></td>
</tr>
<tr>
<td>precioPorButaca</td>
<td>Precio individual por cada butaca en euros</td>
<td>number</td>
<td>-</td>
<td>8</td>
</tr>
</tbody>
</table>
<h2 id="expose" tabindex="-1"><a class="header-anchor" href="#expose"><span>Expose</span></a></h2>
<h3 id="sala" tabindex="-1"><a class="header-anchor" href="#sala"><span>sala</span></a></h3>
<blockquote>
<p>Array bidimensional con el estado de todas las butacas</p>
</blockquote>
<h3 id="seleccionarbutaca" tabindex="-1"><a class="header-anchor" href="#seleccionarbutaca"><span>seleccionarButaca</span></a></h3>
<blockquote>
<p>Función para seleccionar o deseleccionar una butaca</p>
</blockquote>
<h3 id="confirmarreserva" tabindex="-1"><a class="header-anchor" href="#confirmarreserva"><span>confirmarReserva</span></a></h3>
<blockquote>
<p>Función para confirmar la reserva de butacas seleccionadas</p>
</blockquote>
<h3 id="butacasseleccionadas" tabindex="-1"><a class="header-anchor" href="#butacasseleccionadas"><span>butacasSeleccionadas</span></a></h3>
<blockquote>
<p>Lista de IDs de butacas actualmente seleccionadas</p>
</blockquote>
<h3 id="totalapagar" tabindex="-1"><a class="header-anchor" href="#totalapagar"><span>totalAPagar</span></a></h3>
<blockquote>
<p>Precio total de la reserva basado en las butacas seleccionadas</p>
</blockquote>
<hr>
</div></template>


