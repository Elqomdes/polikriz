"use client";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  scores: Record<string, number>; // ISO3 -> score 0..1
  onCountryClick?: (countryName: string, iso3?: string) => void;
  isNight?: boolean;
  showAtmosphere?: boolean;
};

type CountryData = {
  iso3: string;
  name: string;
  turkishName: string;
  score: number;
  color: string;
  position: [number, number, number];
};

// Türkçe ülke isimleri
const COUNTRY_NAMES_TR: Record<string, string> = {
  TUR: "Türkiye", USA: "Amerika Birleşik Devletleri", DEU: "Almanya", FRA: "Fransa",
  CHN: "Çin", GBR: "Birleşik Krallık", RUS: "Rusya", IND: "Hindistan", BRA: "Brezilya",
  JPN: "Japonya", CAN: "Kanada", AUS: "Avustralya", ITA: "İtalya", ESP: "İspanya",
  MEX: "Meksika", ARG: "Arjantin", ZAF: "Güney Afrika", EGY: "Mısır", NGA: "Nijerya",
  KEN: "Kenya", MAR: "Fas", SAU: "Suudi Arabistan", IRN: "İran", IRQ: "Irak",
  SYR: "Suriye", LBY: "Libya", UKR: "Ukrayna", POL: "Polonya", CZE: "Çekya",
  HUN: "Macaristan", ROU: "Romanya", BGR: "Bulgaristan", GRC: "Yunanistan",
  ISR: "İsrail", PSE: "Filistin", JOR: "Ürdün", LBN: "Lübnan", KWT: "Kuveyt",
  ARE: "Birleşik Arap Emirlikleri", QAT: "Katar", BHR: "Bahreyn", OMN: "Umman",
  YEM: "Yemen", AFG: "Afganistan", PAK: "Pakistan", BGD: "Bangladeş", LKA: "Sri Lanka",
  MMR: "Myanmar", THA: "Tayland", VNM: "Vietnam", IDN: "Endonezya", MYS: "Malezya",
  SGP: "Singapur", PHL: "Filipinler", KOR: "Güney Kore", PRK: "Kuzey Kore",
  MNG: "Moğolistan", KAZ: "Kazakistan", UZB: "Özbekistan", KGZ: "Kırgızistan",
  TJK: "Tacikistan", TKM: "Türkmenistan", AZE: "Azerbaycan", ARM: "Ermenistan",
  GEO: "Gürcistan", MDA: "Moldova", BLR: "Belarus", LTU: "Litvanya", LVA: "Letonya",
  EST: "Estonya", FIN: "Finlandiya", SWE: "İsveç", NOR: "Norveç", DNK: "Danimarka",
  ISL: "İzlanda", IRL: "İrlanda", NLD: "Hollanda", BEL: "Belçika", LUX: "Lüksemburg",
  CHE: "İsviçre", AUT: "Avusturya", SVK: "Slovakya", SVN: "Slovenya", HRV: "Hırvatistan",
  BIH: "Bosna-Hersek", SRB: "Sırbistan", MNE: "Karadağ", MKD: "Kuzey Makedonya",
  ALB: "Arnavutluk", KOS: "Kosova"
};

// Ülke koordinatları (basitleştirilmiş)
const COUNTRY_COORDINATES: Record<string, [number, number]> = {
  TUR: [39.9334, 32.8597], USA: [39.8283, -98.5795], DEU: [51.1657, 10.4515],
  FRA: [46.2276, 2.2137], CHN: [35.8617, 104.1954], GBR: [55.3781, -3.4360],
  RUS: [61.5240, 105.3188], IND: [20.5937, 78.9629], BRA: [-14.2350, -51.9253],
  JPN: [36.2048, 138.2529], CAN: [56.1304, -106.3468], AUS: [-25.2744, 133.7751],
  ITA: [41.8719, 12.5674], ESP: [40.4637, -3.7492], MEX: [23.6345, -102.5528],
  ARG: [-38.4161, -63.6167], ZAF: [-30.5595, 22.9375], EGY: [26.0975, 30.0444],
  NGA: [9.0820, 8.6753], KEN: [-0.0236, 37.9062], MAR: [31.6295, -7.9811],
  SAU: [23.8859, 45.0792], IRN: [32.4279, 53.6880], IRQ: [33.2232, 43.6793],
  SYR: [34.8021, 38.9968], LBY: [26.3351, 17.2283], UKR: [48.3794, 31.1656],
  POL: [51.9194, 19.1451], CZE: [49.8175, 15.4730], HUN: [47.1625, 19.5033],
  ROU: [45.9432, 24.9668], BGR: [42.7339, 25.4858], GRC: [39.0742, 21.8243],
  ISR: [31.0461, 34.8516], PSE: [31.9522, 35.2332], JOR: [30.5852, 36.2384],
  LBN: [33.8547, 35.8623], KWT: [29.3117, 47.4818], ARE: [23.4241, 53.8478],
  QAT: [25.3548, 51.1839], BHR: [25.9304, 50.6378], OMN: [21.4735, 55.9754],
  YEM: [15.5527, 48.5164], AFG: [33.9391, 67.7100], PAK: [30.3753, 69.3451],
  BGD: [23.6850, 90.3563], LKA: [7.8731, 80.7718], MMR: [21.9162, 95.9560],
  THA: [15.8700, 100.9925], VNM: [14.0583, 108.2772], IDN: [-0.7893, 113.9213],
  MYS: [4.2105, 101.9758], SGP: [1.3521, 103.8198], PHL: [12.8797, 121.7740],
  KOR: [35.9078, 127.7669], PRK: [40.3399, 127.5101], MNG: [46.8625, 103.8467],
  KAZ: [48.0196, 66.9237], UZB: [41.3775, 64.5853], KGZ: [41.2044, 74.7661],
  TJK: [38.8610, 71.2761], TKM: [38.9697, 59.5563], AZE: [40.0691, 47.5769],
  ARM: [40.0691, 45.0382], GEO: [42.3154, 43.3569], MDA: [47.4116, 28.3699],
  BLR: [53.7098, 27.9534], LTU: [55.1694, 23.8813], LVA: [56.8796, 24.6032],
  EST: [58.5953, 25.0136], FIN: [61.9241, 25.7482], SWE: [60.1282, 18.6435],
  NOR: [60.4720, 8.4689], DNK: [56.2639, 9.5018], ISL: [64.9631, -19.0208],
  IRL: [53.4129, -8.2439], NLD: [52.1326, 5.2913], BEL: [50.5039, 4.4699],
  LUX: [49.8153, 6.1296], CHE: [46.8182, 8.2275], AUT: [47.5162, 14.5501],
  SVK: [48.6690, 19.6990], SVN: [46.1512, 14.9955], HRV: [45.1000, 15.2000],
  BIH: [43.9159, 17.6791], SRB: [44.0165, 21.0059], MNE: [42.7087, 19.3744],
  MKD: [41.6086, 21.7453], ALB: [41.1533, 20.1683], KOS: [42.6026, 20.9030]
};

function latLonToVector3(lat: number, lon: number, radius: number = 1): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return [x, y, z];
}

function getScoreColor(score: number): string {
  const colorStops = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"];
  const clampedScore = Math.max(0, Math.min(1, score));
  const scaled = clampedScore * (colorStops.length - 1);
  const i = Math.floor(scaled);
  const localT = scaled - i;
  
  if (i >= colorStops.length - 1) return colorStops[colorStops.length - 1];
  if (i < 0) return colorStops[0];
  
  // Basit renk interpolasyonu
  const c1 = colorStops[i];
  const c2 = colorStops[i + 1];
  
  // Hex renkleri RGB'ye çevir
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);
  
  if (!rgb1 || !rgb2) return c1;
  
  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * localT);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * localT);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * localT);
  
  return `rgb(${r}, ${g}, ${b})`;
}

function CountryMarker({ country, onCountryClick }: { country: CountryData; onCountryClick?: (countryName: string, iso3?: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
    }
  });

  const handleClick = useCallback(() => {
    if (onCountryClick) {
      onCountryClick(country.turkishName, country.iso3);
    }
  }, [onCountryClick, country.turkishName, country.iso3]);

  return (
    <group position={country.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial 
          color={country.color} 
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial 
          color={country.color} 
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-white/90 dark:bg-gray-900/90 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm text-xs max-w-48">
            <div className="font-semibold text-gray-900 dark:text-white">{country.turkishName}</div>
            <div className="text-gray-600 dark:text-gray-300 mt-1">
              Polikriz Skoru: <span className="font-medium">{country.score.toFixed(2)}</span>
            </div>
            <div className="text-blue-600 dark:text-blue-400 mt-1 text-xs">
              Detaylar için tıklayın
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

function Globe({ scores, onCountryClick, isNight = false, showAtmosphere = true }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [worldTexture, setWorldTexture] = useState<THREE.Texture | null>(null);
  const [fallbackTexture, setFallbackTexture] = useState<THREE.Texture | null>(null);
  const [textureError, setTextureError] = useState(false);

  // Dokuları manuel ve güvenli şekilde yükle (SVG yerine JPEG kullan)
  useEffect(() => {
    let disposed = false;
    const loader = new THREE.TextureLoader();

    const configure = (t: THREE.Texture) => {
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.flipY = false;
      t.anisotropy = 16;
      return t;
    };

    // Önce ana dokuyu (JPEG) yükle
    const worldUrl = '/earth-diffuse.jpg';
    loader.load(
      worldUrl,
      (tex) => {
        if (disposed) return;
        setWorldTexture(configure(tex));
      },
      undefined,
      () => {
        if (disposed) return;
        // Ana doku başarısızsa fallback (JPEG) yükle
        setTextureError(true);
        const fbUrl = '/earth-fallback.jpg';
        loader.load(
          fbUrl,
          (tex) => {
            if (disposed) return;
            setFallbackTexture(configure(tex));
          },
          undefined,
          () => {
            if (disposed) return;
            // Fallback da başarısız olursa state korunur
          }
        );
      }
    );

    return () => {
      disposed = true;
    };
  }, []);
  
  const countries = useMemo(() => {
    return Object.entries(scores).map(([iso3, score]) => {
      const coords = COUNTRY_COORDINATES[iso3];
      if (!coords) return null;
      
      const [lat, lon] = coords;
      const position = latLonToVector3(lat, lon, 1.02);
      const color = getScoreColor(score);
      const turkishName = COUNTRY_NAMES_TR[iso3] || iso3;
      
      return {
        iso3,
        name: iso3,
        turkishName,
        score,
        color,
        position
      } as CountryData;
    }).filter(Boolean) as CountryData[];
  }, [scores]);

  return (
    <>
      {/* Main Earth Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 256, 256]} />
        {textureError && fallbackTexture ? (
          <meshPhongMaterial 
            map={fallbackTexture}
            shininess={100}
            specular={0x222222}
            transparent={false}
            opacity={1.0}
            wireframe={false}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshPhongMaterial 
            map={worldTexture || undefined}
            shininess={100}
            specular={0x222222}
            transparent={false}
            opacity={1.0}
            wireframe={false}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
      
      {/* Night Lights Layer */}
      {isNight && false && (
        <mesh>
          <sphereGeometry args={[1.001, 256, 256]} />
          <meshBasicMaterial 
            map={undefined}
            transparent={true}
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Atmosphere Glow */}
      {showAtmosphere && (
        <mesh>
          <sphereGeometry args={[1.1, 64, 64]} />
          <meshBasicMaterial 
            color="#87CEEB"
            transparent={true}
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Country Markers */}
      {countries.map((country) => (
        <CountryMarker key={country.iso3} country={country} onCountryClick={onCountryClick} />
      ))}
      
      {/* Professional Lighting Setup */}
      <ambientLight intensity={0.3} color="#404040" />
      <directionalLight 
        position={[5, 3, 5]} 
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight 
        position={[-3, -2, -3]} 
        intensity={0.3}
        color="#4a90e2"
      />
      <pointLight 
        position={[0, 0, 5]} 
        intensity={0.1} 
        color="#ffffff"
        distance={20}
      />
      <hemisphereLight 
        args={["#87CEEB", "#8B4513", 0.4]} 
      />
    </>
  );
}

export default function Globe3D({ scores, onCountryClick }: Props) {
  const [isNight, setIsNight] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  
  return (
    <div className="w-full h-[600px] relative bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-800 dark:to-slate-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
        shadows
      >
        <Globe scores={scores} onCountryClick={onCountryClick} isNight={isNight} showAtmosphere={showAtmosphere} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={1.5}
          maxDistance={5}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        <div className="bg-white/90 dark:bg-gray-900/90 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Kontrol</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Fare ile döndür • Scroll ile zoom
          </div>
        </div>
        
        <div className="bg-white/90 dark:bg-gray-900/90 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Toplam Ülke</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {Object.keys(scores).length} ülke
          </div>
        </div>
      </div>
      
      {/* Professional Controls Panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setIsNight(!isNight)}
          className="bg-white/90 dark:bg-gray-900/90 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-xs font-medium text-gray-900 dark:text-white">
            {isNight ? '🌙' : '☀️'} {isNight ? 'Gece' : 'Gündüz'}
          </div>
        </button>
        
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="bg-white/90 dark:bg-gray-900/90 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-xs font-medium text-gray-900 dark:text-white">
            {autoRotate ? '⏸️' : '▶️'} {autoRotate ? 'Durdur' : 'Döndür'}
          </div>
        </button>
        
        <button
          onClick={() => setShowAtmosphere(!showAtmosphere)}
          className="bg-white/90 dark:bg-gray-900/90 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          <div className="text-xs font-medium text-gray-900 dark:text-white">
            {showAtmosphere ? '🌍' : '🌎'} Atmosfer
          </div>
        </button>
      </div>
      
      {/* Professional Legend */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/95 dark:bg-gray-900/95 px-6 py-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Polikriz Risk Seviyeleri</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">0.0 - 1.0 arası</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600 dark:text-gray-300">Düşük (0.0-0.3)</span>
            </div>
            
            <div className="flex-1 h-2 rounded-full shadow-inner" style={{ 
              background: `linear-gradient(to right, #f7fbff, #deebf7, #c6dbef, #9ecae1, #6baed6, #4292c6, #2171b5, #08519c, #08306b)` 
            }} />
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-300">Yüksek (0.7-1.0)</span>
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
            Ülkelere tıklayarak detaylı analiz sayfasına gidin
          </div>
        </div>
      </div>
    </div>
  );
}
