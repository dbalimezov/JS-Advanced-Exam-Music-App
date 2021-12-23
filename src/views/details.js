import { deleteAlbum, getAlbumById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTamplate = (album, isCreator, userData, onDelete) => html`
<section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="..${album.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: ${album.price}</h4>
                        <h4>Date: ${album.releaseData}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${isCreator && userData
                      ? html` <div class="actionBtn">
                        <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                    </div>`
                      : ''}
                   
                </div>
            </div>
        </section>`

export async function detailsPage(ctx){
    const album = await getAlbumById(ctx.params.id);
    const userData = getUserData();
    const isCreator = userData && album._ownerId === userData.id;
    ctx.render(detailsTamplate(album, isCreator, userData, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this album FOREVER?');

        if(choice){
            deleteAlbum(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}