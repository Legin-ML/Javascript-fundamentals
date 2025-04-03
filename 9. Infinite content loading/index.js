const postsPerPage = 5;
let currentPage = 1;
let isLoading = false;
let hasMoreContent = true;

function generateRandomTitle() {
    const prefixes = ['Unholy', 'Infernal', 'Eternal', 'Argent', 'Hellish', 'Demonic', 'Praetor', 'Crimson', 'Blood', 'Night'];
    const subjects = ['Testament', 'Codex', 'Chronicle', 'Reckoning', 'Crusade', 'Cleansing', 'Retribution', 'Vengeance', 'Purification', 'Sentinel'];
    
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${subjects[Math.floor(Math.random() * subjects.length)]}`;
}

function generateRandomParagraph() {
    const sentences = [
        "In the first age, in the first battle, when the shadows first lengthened, one stood.",
        "They are rage, brutal, without mercy. But you. You will be worse. Rip and tear, until it is done.",
        "Tempered by the fires of Hell, his iron will remained steadfast through the passage that preys upon the weak.",
        "The Doom Slayer sought to end the dominion of the dark lords, passing through the divide as none but demon had before.",
        "And in his conquest against the blackened souls of the doomed, his prowess was shown.",
        "From the heretic symbols, he drew strength, and crushed the obsidian pillars of the Blood Temples.",
        "The age of his reckoning was uncounted, the scribes carved his name deep in the tablets of Hell.",
        "The forces of Hell were bent on sacrificing all to their lord, and they would unleash the Heart of Gaia to achieve it.",
        "Against all the evil that Hell can conjure, all the wickedness that mankind can produce, we will send unto them only you.",
        "Across eons he traveled, ever seeking vengeance against the dark lords who had wronged him."
    ];
    
    const paragraphLength = 3 + Math.floor(Math.random() * 3);
    let paragraph = '';
    
    for (let i = 0; i < paragraphLength; i++) {
        paragraph += sentences[Math.floor(Math.random() * sentences.length)] + ' ';
    }
    
    return paragraph.trim();
}

function generateRandomDate() {
    const eras = ["First Age", "Second Age", "Time of Ascension", "Age of Torment", "Unholy Reckoning", "Year of Tribulation", "Epoch of Wrath", "Hell's Dominion"];
    const numbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    
    return `${eras[Math.floor(Math.random() * eras.length)]}, Testament ${numbers[Math.floor(Math.random() * numbers.length)]}`;
}

function generateRandomAuthor() {
    const titles = ['Sentinel', 'Scribe', 'Prophet', 'Witness', 'Guardian', 'Templar', 'Priest', 'Cardinal', 'Overlord', 'Ancient'];
    const names = ['D\'Nur', 'Argenta', 'Deag', 'Corrax', 'Valen', 'Taras', 'Nihil', 'Makyr', 'Wraith', 'Doomslayer'];
    
    return `${titles[Math.floor(Math.random() * titles.length)]} of ${names[Math.floor(Math.random() * names.length)]}`;
}

function fetchPosts(page, perPage) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const posts = [];
            
            const postsToGenerate = page > 10 ? Math.max(0, perPage - (page - 10)) : perPage; // Simulated reduction of posts, can be modified as below to have infinite loading
            // const postsToGenerate = perPage;
            
            for (let i = 0; i < postsToGenerate; i++) {
                posts.push({
                    id: (page - 1) * perPage + i + 1,
                    title: generateRandomTitle(),
                    body: generateRandomParagraph(),
                    date: generateRandomDate(),
                    author: generateRandomAuthor(),
                    readTime: `${Math.floor(Math.random() * 10) + 2} minutes`
                });
            }
            
            resolve(posts);
        }, 500); //Delay simulation
    });
}

function renderPosts(posts) {
    const contentContainer = document.getElementById('content');
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <div class="post-meta">
                <span>Recorded by ${post.author} · ${post.date}</span>
                <span>${post.readTime}</span>
            </div>
        `;
        
        contentContainer.appendChild(postElement);
    });
}

async function loadMorePosts() {
    if (isLoading || !hasMoreContent) return;
    
    isLoading = true;
    document.getElementById('loading').style.display = 'block';
    
    try {
        const newPosts = await fetchPosts(currentPage, postsPerPage);
        
        if (newPosts.length === 0) {
            hasMoreContent = false;
            document.getElementById('loading').innerHTML = 'No more testaments remain';
        } else {
            renderPosts(newPosts);
            currentPage++;
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        document.getElementById('loading').innerHTML = 'The archives are corrupted. The path is blocked.';
    } finally {
        isLoading = false;
        if (hasMoreContent) {
            document.getElementById('loading').style.display = 'none';
        }
    }
}

function isNearBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 800;
}

window.addEventListener('scroll', () => {
    if (isNearBottom()) {
        loadMorePosts();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    loadMorePosts();
});