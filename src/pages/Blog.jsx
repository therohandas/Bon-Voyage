import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

// Google Sheets URL for newsletter
const NEWSLETTER_SHEET_URL = import.meta.env.VITE_NEWSLETTER_SHEET_URL || import.meta.env.VITE_GOOGLE_SHEET_URL || '';

// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        slug: 'hidden-gems-odisha',
        title: 'Top 10 Hidden Gems in Odisha Worth Exploring',
        excerpt: 'Beyond the popular tourist destinations, Odisha offers remarkable offbeat locations that showcase the state\'s diverse landscapes and rich heritage.',
        image: '/images/locations/satkosia-gorge.jpg',
        category: 'Destinations',
        author: 'Bon Voyage Team',
        date: '2024-12-15',
        readTime: '8 min',
        featured: true,
        content: `
            <p>While Puri, Konark, and Bhubaneswar attract millions of visitors annually, Odisha's lesser-known destinations offer equally compelling experiences with fewer crowds. This guide highlights ten remarkable locations that deserve attention.</p>
            
            <h2>1. Satkosia Gorge</h2>
            <p>The Mahanadi River carves through the Eastern Ghats to create this 22-kilometer gorge, forming one of India's most scenic river corridors. The Satkosia Tiger Reserve surrounding the gorge is home to gharials, mugger crocodiles, and diverse bird species. Boat rides at dawn offer the best wildlife viewing opportunities.</p>
            <p><strong>Best time to visit:</strong> November to February<br/><strong>How to reach:</strong> 140 km from Bhubaneswar via NH-55</p>
            
            <h2>2. Daringbadi</h2>
            <p>Often called the "Kashmir of Odisha," this hill station sits at 915 meters (3,000 feet) in the Eastern Ghats. The area features pine forests, coffee plantations, and the Doluri River valley. Temperatures occasionally drop below 0°C in winter, making it the only location in Odisha that experiences frost.</p>
            <p><strong>Best time to visit:</strong> September to March<br/><strong>How to reach:</strong> 250 km from Bhubaneswar via Berhampur</p>
            
            <h2>3. Gandhamardan Hills</h2>
            <p>This biodiversity hotspot hosts over 500 species of medicinal plants, earning it the nickname "Ayurvedic Mountain." The twin peaks offer panoramic views of the surrounding valleys, and the area holds religious significance for both Hindu and Buddhist traditions.</p>
            
            <h2>4. Harishankar Temple</h2>
            <p>Located at the base of Gandhamardan Hills, this ancient Shiva temple features a natural waterfall that flows beside the shrine. The surrounding forest and rock formations create a peaceful atmosphere distinct from urban temple complexes.</p>
            
            <h2>5. Debrigarh Wildlife Sanctuary</h2>
            <p>Situated on the banks of Hirakud Reservoir, this sanctuary protects tigers, leopards, elephants, and sambar deer across 347 square kilometers of dry deciduous forest. Wildlife safaris operate during the dry season when animal sightings are most reliable.</p>
            
            <h2>6-10. More Hidden Treasures</h2>
            <p>Other notable destinations include <strong>Pradhanpat Waterfall</strong> in Deogarh, <strong>Bhitarkanika mangrove forests</strong>, the ancient rock art at <strong>Vikramkhol</strong>, pilgrimage town <strong>Talcher</strong>, and the tribal villages of <strong>Koraput district</strong>. Each offers unique experiences away from mainstream tourism.</p>
        `
    },
    {
        id: 2,
        slug: 'best-beaches-odisha',
        title: 'Complete Guide to Odisha\'s Best Beaches',
        excerpt: 'With 480 kilometers of coastline along the Bay of Bengal, Odisha offers diverse beach experiences from sacred pilgrimage sites to serene getaways.',
        image: '/images/locations/gopalpur-on-sea.jpg',
        category: 'Beaches',
        author: 'Bon Voyage Team',
        date: '2024-12-10',
        readTime: '7 min',
        featured: true,
        content: `
            <p>Odisha's eastern coastline features beaches ranging from bustling pilgrimage centers to quiet fishing villages. Unlike Goa or Kerala, most Odisha beaches remain relatively uncrowded, offering authentic coastal experiences.</p>
            
            <h2>Puri Beach</h2>
            <p>The most famous beach in Odisha draws millions of visitors annually due to its proximity to Jagannath Temple. The golden sand beach stretches for several kilometers and features designated swimming zones with lifeguards. The fishing village of Penthakata offers glimpses of traditional coastal life.</p>
            <p><strong>Facilities:</strong> Hotels, restaurants, changing rooms, lifeguards<br/><strong>Swimming:</strong> Designated zones only; strong currents in some areas</p>
            
            <h2>Chandipur Beach</h2>
            <p>This beach exhibits a unique tidal phenomenon where the sea recedes up to 5 kilometers during low tide, exposing the seafloor for walking. The extreme tidal variation results from the gentle slope of the continental shelf in this region. Visitors can observe marine life including horseshoe crabs during low tide.</p>
            <p><strong>Best time:</strong> Check tide tables for low tide timing<br/><strong>Note:</strong> DRDO missile testing facility nearby; some beach sections may be restricted</p>
            
            <h2>Gopalpur-on-Sea</h2>
            <p>A former colonial-era port town, Gopalpur retains its heritage architecture along the beachfront. The beach is less crowded than Puri and suitable for swimming during calm weather. The old lighthouse offers panoramic coastal views.</p>
            <p><strong>Accommodation:</strong> Heritage hotels and beach resorts available<br/><strong>Best time:</strong> October to March</p>
            
            <h2>Other Notable Beaches</h2>
            <p><strong>Talasari:</strong> Located where the Subarnarekha River meets the sea, offering unique landscape<br/>
            <strong>Paradeep:</strong> Major port town with adjacent beach<br/>
            <strong>Astaranga:</strong> Known for spectacular sunsets over the bay</p>
        `
    },
    {
        id: 3,
        slug: 'temple-trail-odisha',
        title: 'Exploring Odisha\'s Ancient Temple Architecture',
        excerpt: 'Odisha preserves some of India\'s finest examples of Kalinga architecture, with temples spanning from the 7th to 13th centuries CE.',
        image: '/images/locations/rajarani-temple.jpg',
        category: 'Heritage',
        author: 'Bon Voyage Team',
        date: '2024-12-05',
        readTime: '9 min',
        featured: false,
        content: `
            <p>Kalinga architecture, the distinctive temple-building tradition of ancient Odisha, reached its peak between the 8th and 13th centuries CE. These temples are characterized by their curvilinear towers (deuls), ornate sculptural programs, and precise geometric proportions.</p>
            
            <h2>Konark Sun Temple</h2>
            <p>This UNESCO World Heritage Site was constructed in the 13th century CE by King Narasimhadeva I. Designed as a massive chariot with 24 carved wheels, the temple served as both a religious monument and an astronomical instrument. The wheels function as sundials, with the spokes casting shadows that indicate time with precision.</p>
            <p>The temple's sculptural program includes scenes from daily life, mythological narratives, and representations of celestial bodies. Notable features include the erotic sculptures on the exterior walls, interpreted variously as tantric symbolism or representations of worldly life that pilgrims must transcend.</p>
            <p><strong>Entry:</strong> ₹40 (Indians), ₹600 (Foreigners)<br/><strong>Best time to visit:</strong> Early morning or late afternoon for photography</p>
            
            <h2>Lingaraj Temple, Bhubaneswar</h2>
            <p>The largest and most important temple in Bhubaneswar stands 55 meters tall and dates primarily to the 11th century CE. The temple exemplifies mature Kalinga style with its proportional harmony between the main tower and subsidiary structures. Non-Hindus may view the temple from a raised platform adjacent to the complex.</p>
            
            <h2>Rajarani Temple</h2>
            <p>Named for the honey-colored sandstone used in its construction, Rajarani Temple features some of the finest sculptural work in Odisha. The temple lacks a presiding deity and was likely never consecrated. Its sculptures of the ashta-dikpalas (eight directional guardians) and various female figures demonstrate exceptional artistic achievement.</p>
            
            <h2>Planning a Temple Tour</h2>
            <p>Bhubaneswar alone contains over 100 temples. A practical approach covers the "Old Town" temple cluster in one day, with separate visits to Konark (65 km) and the Udayagiri-Khandagiri caves (6 km). Archaeological Survey of India guides are available at major sites.</p>
        `
    },
    {
        id: 4,
        slug: 'wildlife-odisha',
        title: 'Wildlife Destinations in Odisha: A Comprehensive Guide',
        excerpt: 'From tiger reserves to sea turtle nesting sites, Odisha\'s diverse ecosystems support remarkable wildlife watching opportunities.',
        image: '/images/locations/bhitarkanika-national-park.jpg',
        category: 'Wildlife',
        author: 'Bon Voyage Team',
        date: '2024-11-28',
        readTime: '8 min',
        featured: false,
        content: `
            <p>Odisha's varied geography — from mountains to mangroves to coastline — creates diverse habitats supporting significant wildlife populations. The state hosts several tiger reserves, important bird areas, and one of the world's largest sea turtle nesting sites.</p>
            
            <h2>Simlipal National Park</h2>
            <p>This 2,750-square-kilometer biosphere reserve in Mayurbhanj district supports a significant tiger population, including rare melanistic (pseudo-melanistic) tigers with unusually dark coloration. The park's sal forests also harbor elephants, leopards, giant squirrels, and over 230 bird species.</p>
            <p><strong>Safari timing:</strong> 6:00 AM - 10:00 AM, 3:00 PM - 6:00 PM<br/><strong>Entry points:</strong> Jashipur (south), Pithabata (north)<br/><strong>Best season:</strong> November to June (closed during monsoon)</p>
            
            <h2>Bhitarkanika National Park</h2>
            <p>India's second-largest mangrove ecosystem covers 672 square kilometers of tidal waterways and mudflats. The park protects one of India's largest saltwater crocodile populations, with individuals exceeding 6 meters documented. Boat safaris navigate through mangrove channels where crocodiles, water monitors, and numerous bird species can be observed.</p>
            <p><strong>How to visit:</strong> Boat safaris from Dangamala or Khola jetty<br/><strong>Permit required:</strong> Yes, book through Odisha Forest Department</p>
            
            <h2>Gahirmatha Marine Sanctuary</h2>
            <p>This coastal sanctuary hosts the world's largest mass nesting (arribada) of olive ridley sea turtles. Between January and March, hundreds of thousands of turtles come ashore over several nights to lay eggs. Public access is restricted during nesting season to protect the turtles; limited permits are available through the forest department.</p>
            
            <h2>Other Wildlife Areas</h2>
            <p><strong>Chilika Lake:</strong> Asia's largest brackish water lagoon; important wintering ground for migratory birds<br/>
            <strong>Nandankanan:</strong> Zoo and botanical garden known for white tiger breeding program<br/>
            <strong>Debrigarh:</strong> Dry deciduous forest sanctuary on Hirakud Reservoir</p>
        `
    },
    {
        id: 5,
        slug: 'odisha-cuisine-guide',
        title: 'Guide to Traditional Odia Cuisine',
        excerpt: 'Odia food reflects the state\'s agricultural heritage and temple traditions, emphasizing balanced flavors and subtle spicing.',
        image: '/images/locations/pipili.jpg',
        category: 'Culture',
        author: 'Bon Voyage Team',
        date: '2024-11-20',
        readTime: '6 min',
        featured: false,
        content: `
            <p>Odia cuisine stands apart from other Indian food traditions through its emphasis on subtle flavors, minimal use of oil, and the prominence of local ingredients like mustard paste, panch phoron (five-spice blend), and fresh coconut.</p>
            
            <h2>Essential Dishes</h2>
            
            <p><strong>Dalma:</strong> The signature dish of Odisha combines lentils with seasonal vegetables and raw banana, tempered with panch phoron and finished with ghee. Served with rice, it forms the nutritional foundation of daily meals.</p>
            
            <p><strong>Pakhala Bhata:</strong> Fermented rice soaked in water, traditionally served with fried fish, pickle, and raw onion. This cooling dish provides relief during hot summer months and is celebrated state-wide on June 20 (Pakhala Dibasa).</p>
            
            <p><strong>Machha Besara:</strong> Fish prepared in mustard paste sauce, highlighting Odisha's freshwater fish from Chilika Lake and the Mahanadi River system.</p>
            
            <h2>Temple Food Traditions</h2>
            <p>The Mahaprasad served at Jagannath Temple represents sacred cuisine prepared according to ancient protocols. The temple's Ananda Bazaar serves 56 distinct preparations (chhappan bhog) on sal leaves to thousands of devotees daily. This is considered the largest kitchen operation in the world.</p>
            
            <h2>Sweets and Desserts</h2>
            <p><strong>Chhena Poda:</strong> Caramelized cottage cheese dessert, invented in Nayagarh district. The cheese is mixed with sugar and cardamom, then baked until the exterior caramelizes.</p>
            
            <p><strong>Rasabali:</strong> Flattened cheese patties soaked in thickened, cardamom-flavored milk. The town of Pahala on NH-16 is famous for this preparation.</p>
            
            <p><strong>Khaja:</strong> Layered, crispy sweet from Puri, often purchased by pilgrims as prasad.</p>
            
            <h2>Where to Eat</h2>
            <p>Traditional Odia thalis are served at hotels throughout the state. For street food, the areas around major temples offer authentic preparations. Cuttack and Bhubaneswar have dedicated sweet shops for regional specialties.</p>
        `
    },
    {
        id: 6,
        slug: 'monsoon-waterfalls',
        title: 'Odisha\'s Waterfalls: A Monsoon Travel Guide',
        excerpt: 'The monsoon season transforms Odisha\'s Eastern Ghats into waterfall country, with cascades ranging from 30 to 400 meters.',
        image: '/images/locations/duduma-waterfalls.jpg',
        category: 'Nature',
        author: 'Bon Voyage Team',
        date: '2024-11-15',
        readTime: '7 min',
        featured: false,
        content: `
            <p>From July through October, seasonal streams and rivers in Odisha's hilly western regions swell with monsoon rains, creating spectacular waterfalls. While some falls flow year-round, they reach their peak volume during and immediately after the monsoon.</p>
            
            <h2>Barehipani Falls</h2>
            <p>Located within Simlipal National Park, Barehipani is India's second-highest waterfall at 399 meters (1,309 feet). The falls drop in two tiers from the Meghasani mountain. Viewing requires a 3-kilometer trek from the nearest vehicle access point within the park.</p>
            <p><strong>Best season:</strong> July to October<br/><strong>Access:</strong> Simlipal park permit required; waterfalls zone opens only during monsoon</p>
            
            <h2>Duduma Falls</h2>
            <p>On the Odisha-Andhra Pradesh border, Duduma Falls drops 175 meters where the Machkund River plunges into a gorge. The hydroelectric project at the site has reduced water flow, but the falls remain impressive during monsoon. A viewpoint offers safe observation of the cascade.</p>
            <p><strong>Location:</strong> Koraput district, 40 km from Jeypore<br/><strong>Facilities:</strong> OTDC guest house nearby</p>
            
            <h2>Khandadhar Falls</h2>
            <p>At 244 meters, Khandadhar in Keonjhar district is Odisha's third-highest waterfall. The name means "sword stream," referring to the narrow cascade that widens as it descends. The falls are accessible via a 2-kilometer walk from the nearest road.</p>
            
            <h2>Other Notable Falls</h2>
            <p><strong>Joranda and Barehipani:</strong> Within Simlipal (viewable together)<br/>
            <strong>Pradhanpat:</strong> Wide cascade in Deogarh district<br/>
            <strong>Sanaghagara:</strong> Easily accessible falls in Keonjhar with road-side access</p>
            
            <h2>Travel Considerations</h2>
            <p>Monsoon travel in Odisha requires preparation. Roads in hilly areas may be affected by landslides or flooding. Leeches are common on forest trails; wearing long pants and carrying salt can help. Always check local conditions before traveling to remote waterfall locations.</p>
        `
    }
];

const categories = ['All', 'Destinations', 'Beaches', 'Heritage', 'Wildlife', 'Culture', 'Nature'];

// Share URLs that actually work
const getShareUrls = (title, url) => ({
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    copy: url
});

function BlogCard({ post, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'all 0.3s ease'
            }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(102,126,234,0.1)'
            }}
        >
            <Link to={`/blog/${post.slug}`} style={{ display: 'block', position: 'relative' }}>
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                    <img
                        src={post.image}
                        alt={post.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                        }}
                        onError={(e) => { e.target.src = '/images/locations/placeholder.svg'; }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)'
                    }} />

                    {/* Category pill */}
                    <span style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 20,
                        fontSize: '.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'white'
                    }}>
                        {post.category}
                    </span>

                    {/* Read time */}
                    <span style={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        padding: '4px 10px',
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 12,
                        fontSize: '.75rem',
                        color: 'rgba(255,255,255,0.8)'
                    }}>
                        {post.readTime}
                    </span>
                </div>
            </Link>

            <div style={{ padding: '20px 24px 24px' }}>
                <time style={{
                    fontSize: '.8rem',
                    color: 'var(--muted)',
                    marginBottom: 8,
                    display: 'block'
                }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </time>

                <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        lineHeight: 1.4,
                        marginBottom: 10,
                        color: 'var(--txt-1)',
                        transition: 'color 0.2s'
                    }}>
                        {post.title}
                    </h3>
                </Link>

                <p style={{
                    color: 'var(--txt-2)',
                    fontSize: '.9rem',
                    lineHeight: 1.6,
                    marginBottom: 16,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {post.excerpt}
                </p>

                <Link
                    to={`/blog/${post.slug}`}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '.9rem'
                    }}
                >
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </motion.article>
    );
}

function FeaturedCard({ post }) {
    return (
        <motion.article
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
                position: 'relative',
                height: 420,
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer'
            }}
            whileHover={{ scale: 1.02 }}
        >
            <Link to={`/blog/${post.slug}`} style={{ display: 'block', height: '100%' }}>
                <img
                    src={post.image}
                    alt={post.title}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    onError={(e) => { e.target.src = '/images/locations/placeholder.svg'; }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 32
                }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        background: '#667eea',
                        borderRadius: 20,
                        fontSize: '.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 16
                    }}>
                        Featured • {post.category}
                    </span>

                    <h2 style={{
                        fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        marginBottom: 12,
                        color: 'white'
                    }}>
                        {post.title}
                    </h2>

                    <p style={{
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '.95rem',
                        lineHeight: 1.6,
                        marginBottom: 16,
                        maxWidth: 500
                    }}>
                        {post.excerpt}
                    </p>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '.85rem'
                    }}>
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

function ShareButtons({ title }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shares = getShareUrls(title, url);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareButtons = [
        { name: 'X', icon: '𝕏', url: shares.twitter },
        { name: 'Facebook', icon: 'f', url: shares.facebook },
        { name: 'LinkedIn', icon: 'in', url: shares.linkedin },
        { name: 'WhatsApp', icon: '💬', url: shares.whatsapp }
    ];

    return (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {shareButtons.map(btn => (
                <a
                    key={btn.name}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--txt-1)',
                        textDecoration: 'none',
                        fontSize: btn.name === 'WhatsApp' ? '1.2rem' : '1rem',
                        fontWeight: btn.name === 'LinkedIn' ? 700 : 500,
                        transition: 'all 0.2s'
                    }}
                    title={`Share on ${btn.name}`}
                >
                    {btn.icon}
                </a>
            ))}
            <button
                onClick={handleCopy}
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: copied ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${copied ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: copied ? '#4ade80' : 'var(--txt-1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                title="Copy link"
            >
                {copied ? '✓' : '🔗'}
            </button>
        </div>
    );
}

function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const data = {
                email,
                timestamp: new Date().toISOString(),
                source: 'Blog Newsletter',
                name: 'Newsletter Subscriber',
                subject: 'newsletter',
                message: 'Newsletter subscription request'
            };

            if (NEWSLETTER_SHEET_URL) {
                await fetch(NEWSLETTER_SHEET_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            setStatus('success');
            setEmail('');
        } catch (err) {
            console.error('Newsletter signup error:', err);
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420 }}>
            <div style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden'
            }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={status === 'loading'}
                    style={{
                        flex: 1,
                        padding: '14px 18px',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--txt-1)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                        padding: '14px 24px',
                        background: status === 'success' ? '#4ade80' : '#667eea',
                        border: 'none',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscribe'}
                </button>
            </div>
            {status === 'success' && (
                <p style={{ color: '#4ade80', fontSize: '.85rem', marginTop: 8 }}>
                    Thanks for subscribing!
                </p>
            )}
            {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '.85rem', marginTop: 8 }}>
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
}

function BlogPost({ post }) {
    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ maxWidth: 720, margin: '0 auto' }}
        >
            <Link
                to="/blog"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'var(--txt-2)',
                    textDecoration: 'none',
                    marginBottom: 32,
                    fontSize: '.9rem',
                    transition: 'color 0.2s'
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                All Articles
            </Link>

            {/* Hero */}
            <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                marginBottom: 40,
                position: 'relative'
            }}>
                <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: 360, objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/images/locations/placeholder.svg'; }}
                />
            </div>

            {/* Meta */}
            <div style={{ marginBottom: 20 }}>
                <span style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    background: 'rgba(102,126,234,0.15)',
                    borderRadius: 6,
                    fontSize: '.8rem',
                    color: '#667eea',
                    fontWeight: 500,
                    marginRight: 12
                }}>
                    {post.category}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    {' '} • {post.readTime}
                </span>
            </div>

            {/* Title */}
            <h1 style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: 24
            }}>
                {post.title}
            </h1>

            {/* Lead */}
            <p style={{
                fontSize: '1.2rem',
                color: 'var(--txt-2)',
                lineHeight: 1.7,
                marginBottom: 40,
                paddingBottom: 40,
                borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>
                {post.excerpt}
            </p>

            {/* Content */}
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share */}
            <div style={{
                marginTop: 56,
                paddingTop: 32,
                borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
                <p style={{ marginBottom: 16, fontWeight: 500 }}>Share this article</p>
                <ShareButtons title={post.title} />
            </div>
        </motion.article>
    );
}

export default function Blog() {
    const { slug } = useParams();
    const [activeCategory, setActiveCategory] = useState('All');

    // Single post view
    if (slug) {
        const post = blogPosts.find(p => p.slug === slug);
        if (!post) {
            return (
                <div className="page-content">
                    <div className="section container" style={{ textAlign: 'center', padding: '120px 20px' }}>
                        <h1 style={{ marginBottom: 16 }}>Article not found</h1>
                        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="page-content">
                <div className="section container">
                    <BlogPost post={post} />
                </div>
                <style>{`
                    .blog-content { color: var(--txt-2); font-size: 1.1rem; line-height: 1.85; }
                    .blog-content h2 { color: var(--txt-1); font-family: 'Playfair Display', serif; font-size: 1.6rem; margin: 40px 0 16px; }
                    .blog-content p { margin-bottom: 20px; }
                    .blog-content strong { color: var(--txt-1); }
                `}</style>
            </div>
        );
    }

    // Filter
    const filteredPosts = activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter(p => p.category === activeCategory);

    const featuredPosts = blogPosts.filter(p => p.featured);

    return (
        <div className="page-content">
            <div className="section container">
                {/* Hero Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 56 }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 16
                    }}>
                        <div style={{
                            width: 32,
                            height: 3,
                            background: '#667eea',
                            borderRadius: 2
                        }} />
                        <span style={{
                            fontSize: '.85rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: '#667eea'
                        }}>
                            Travel Stories
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 600,
                        marginBottom: 16,
                        lineHeight: 1.1
                    }}>
                        Explore. Discover.<br />
                        <span style={{ color: 'var(--txt-2)' }}>Get Inspired.</span>
                    </h1>

                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--txt-2)',
                        maxWidth: 520,
                        lineHeight: 1.7
                    }}>
                        Curated guides, hidden gems, and insider tips for your next adventure in Odisha.
                    </p>
                </motion.header>

                {/* Featured Grid */}
                {activeCategory === 'All' && (
                    <section style={{ marginBottom: 64 }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: 24
                        }}>
                            {featuredPosts.map(post => (
                                <FeaturedCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Category Pills */}
                <div style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 40,
                    flexWrap: 'wrap'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: 8,
                                border: 'none',
                                background: activeCategory === cat
                                    ? '#667eea'
                                    : 'rgba(255,255,255,0.05)',
                                color: activeCategory === cat ? 'white' : 'var(--txt-2)',
                                fontSize: '.9rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Articles Grid */}
                <section style={{ marginBottom: 80 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                gap: 28
                            }}
                        >
                            {(activeCategory === 'All' ? blogPosts.filter(p => !p.featured) : filteredPosts).map((post, idx) => (
                                <BlogCard key={post.id} post={post} index={idx} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredPosts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--txt-2)' }}>
                            No articles in this category yet.
                        </div>
                    )}
                </section>

                {/* Newsletter */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(102,126,234,0.08) 0%, rgba(118,75,162,0.08) 100%)',
                        border: '1px solid rgba(102,126,234,0.15)',
                        borderRadius: 20,
                        padding: 'clamp(32px, 6vw, 56px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 40,
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{ maxWidth: 400 }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontFamily: "'Playfair Display', serif",
                            marginBottom: 8
                        }}>
                            Stay in the loop
                        </h3>
                        <p style={{ color: 'var(--txt-2)', lineHeight: 1.6 }}>
                            Get travel tips and destination highlights delivered to your inbox.
                        </p>
                    </div>
                    <NewsletterForm />
                </motion.section>
            </div>
        </div>
    );
}
