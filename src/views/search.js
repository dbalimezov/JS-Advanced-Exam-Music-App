import { searchAlbums } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const searchTamplate = (matches, userData) => html`
<section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button class="button-list">Search</button>
            </div>

            ${matches != undefined 
            ? html`<h2>Results:</h2>

                <div class="search-result">
                 ${matches.length == 0
                    ? html`<p class="no-result">No result.</p>`
                    : matches.map(album => albumCard(album, userData))}`
            : ''}
            </div>
        </section>`

const albumCard = (album, userData) => html`
<div class="card-box">
                    <img src="${album.imgUrl}">
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${album.name}</p>
                            <p class="artist">Artist: ${album.artist}</p>
                            <p class="genre">Genre: ${album.genre}</p>
                            <p class="price">Price: $${album.price}</p>
                            <p class="date">Release Date: ${album.releaseData}</p>
                        </div>
                        ${userData
                          ? html`<div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>`
                          : ''}
                        
                    </div>
                </div>`

export function searchPage(ctx){
    let matches;
    const userData = getUserData(); 
    ctx.render(searchTamplate(matches, userData));
    
    document.querySelector('button').addEventListener('click', async () =>{
        const query = document.getElementById('search-input').value.trim();
        if (query == ''){
            return alert('The search field is empty');
        }
        matches = await searchAlbums(query);
        ctx.render(searchTamplate(matches, userData));
    })
        
    }
