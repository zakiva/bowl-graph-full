// =============================================================================
// Computer Graphics - Exercise 6 - Interactive Bowling Game
// MILESTONE 1: STRUCTURAL SETUP & STATE MACHINE ARCHITECTURE
// MILESTONE 2: INPUT HANDLING & DYNAMIC POWER METER UI
// MILESTONE 3: ANALYTICAL BALL PHYSICS & GUTTER DETECTION
// =============================================================================

import { OrbitControls } from './OrbitControls.js';

// ============================================================================
// 1. CORE WEBGL GLOBAL CONTEXT INITIALIZATION
// ============================================================================

// Instantiate the master scene container to manage the 3D entity graph hierarchy
const scene = new THREE.Scene();

// Initialize camera with a 75-degree Field of View to emulate natural human perspective matrix splits
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Instantiate hardware WebGL renderer tracking multisample antialiasing passes to avoid jagged edge silhouettes
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Bind drawing buffer dimensions to fill user browser layout boundaries perfectly
renderer.setSize(window.innerWidth, window.innerHeight);

// Append raw compiled WebGL HTML canvas node directly into document DOM framework
document.body.appendChild(renderer.domElement);

// Assign midnight blue background hex tint clear color for space rendering loops
scene.background = new THREE.Color(0x1a1a2e);


// ============================================================================
// 2. SYSTEM ILLUMINATION LOGIC & DYNAMIC DEPTH SHADOW MAP LAYOUTS
// ============================================================================

// Setup non-directional light source to establish global base ambient exposure fill metrics
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// Mount ambient light group node straight into main root rendering index array
scene.add(ambientLight);

// Instantiate high-intensity overhead lane lighting simulator radiating uniform parallel vectors
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// Displace primary light source up, right, and forward to cascade sharp, clean diagonal shadow lines down the lane
directionalLight.position.set(5, 20, 20);
// Commit directional light node pointer to root scene index tracking loops
scene.add(directionalLight);

// Setup localized high-angle pinpoint spot simulator strictly illuminating the back target pin layout deck
const pinDeckLight = new THREE.DirectionalLight(0xffffff, 0.4);
// Offset directly over the pin formation coordinates to cast distinct vertical drops onto the deck surface
pinDeckLight.position.set(0, 10, -55);
// Enable shadow pass rendering tracks exclusively on the target zone projector
pinDeckLight.castShadow = true;
// Save structural pin deck spot lamp configuration into root scene tree
scene.add(pinDeckLight);

// Enable hardware stencil tracking buffers inside master renderer to generate real-time depth shadowing
renderer.shadowMap.enabled = true;
// Force parallel primary light source to actively compile depth texture occlusion map sheets
directionalLight.castShadow = true;


// ============================================================================
// 3. MATHEMATICAL COORDINATE SYSTEM UTILITIES
// ============================================================================

// Transform standard human-readable degrees into Cartesian radian values required by raw Three.js rotation vectors
function degrees_to_radians(degrees) {
  var pi = Math.PI;
  // Standard conversion equation: Multiply input scalar by Pi and scale fractionally by 180 degrees
  return degrees * (pi / 180);
}


// ============================================================================
// 4. MASTER ALLEY INFRASTRUCTURE CREATION FUNCTION
// ============================================================================
function createBowlingLane() {
  
  // MAIN WOOD LANE PLATFORM
  // Allocate dimensions for standard regulation lane: 3.5 wide, 0.2 thick, extending 60 units down-range
  const laneGeometry = new THREE.BoxGeometry(3.5, 0.2, 60);
  // Establish high-specularity glossy surface material behavior simulating freshly varnished maple lane boards
  const laneMaterial = new THREE.MeshPhongMaterial({
    color: 0xDEB887,  // Light maple wood hexadecimal color signature representation
    shininess: 80     // Promotes prominent light pipe reflections down the surface channel
  });
  // Mix geometry structures and material shaders together into a visible independent scene Mesh object
  const lane = new THREE.Mesh(laneGeometry, laneMaterial);
  // Shift block back 30 units on Z axis to map the start line (Foul Line) precisely at Z = 0 coordinates
  lane.position.set(0, 0, -30);
  // Register lane surface plane to intercept incoming shadow projection cascades
  lane.receiveShadow = true;
  // Permit physical edges of lane block to throw baseline occlusion shadows downward
  lane.castShadow = true;
  // Append physical lane mesh structure directly into master view tree array index
  scene.add(lane);

  // PLAYER APPROACH RUNWAY PLATFORM
  // Build standing approach deck tracking 3.5 wide, 0.2 depth matching lane thickness, extending 15 units back
  const approachGeometry = new THREE.BoxGeometry(3.5, 0.2, 15);
  // Emphasize traction properties using less reflective, warmer satin wood compound shaders
  const approachMaterial = new THREE.MeshPhongMaterial({
    color: 0xCD853F,  // Peru rich walnut floorboard tone hexadecimal designation identity
    shininess: 50     // Lower specularity value simulates high footwear traction profile responses
  });
  // Instantiate runway player stance floor block object reference in memory space
  const approach = new THREE.Mesh(approachGeometry, approachMaterial);
  // Position behind the foul line (extends into positive Z), center point set exactly at midplane Z = 7.5
  approach.position.set(0, 0, 7.5);
  // Configure approach runway to receive dynamic drop shadowing cast from players or balls
  approach.receiveShadow = true;
  // Ensure framework side boundaries contribute values to ambient occlusion rendering tracking loops
  approach.castShadow = true;
  // Insert runway walkway block mesh straight to system scene graphics hierarchy index
  scene.add(approach);

  // FLANKING BALL DROP GUTTER TRACKS
  // Define narrow low-clearance boxes spanning full 60 unit lane lengths to catch off-track rolls
  const gutterGeometry = new THREE.BoxGeometry(0.4, 0.1, 60);
  // Create completely flat non-reflective matte finish to replicate dark composite synthetic drainage materials
  const gutterMaterial = new THREE.MeshPhongMaterial({
    color: 0x2c3e50,  // Dark slate steel navy grey hue identity map code
    shininess: 20     // Low scattering coefficient blocks bright wood light bleed artifacts from washing over gutters
  });

  // Construct left side drainage trench module mesh frame
  const leftGutter = new THREE.Mesh(gutterGeometry, gutterMaterial);
  // Align left lane rim at X = -1.95, offset down Y = -0.05 to depress track visibly below wood lane surface
  leftGutter.position.set(-1.95, -0.05, -30);
  // Force gutter geometry paths to capture real-time shadows dropped from rolling spheres
  leftGutter.receiveShadow = true;
  // Save left channel assembly pointer node directly into master world collection array
  scene.add(leftGutter);

  // Construct right side drainage trench module mesh frame
  const rightGutter = new THREE.Mesh(gutterGeometry, gutterMaterial);
  // Mirror left geometry setup tracking parallel right lane rim alignment at positive boundary X = 1.95
  rightGutter.position.set(1.95, -0.05, -30);
  // Force gutter geometry paths to capture real-time shadows dropped from rolling spheres
  rightGutter.receiveShadow = true;
  // Save right channel assembly pointer node directly into master world collection array
  scene.add(rightGutter);

  // REINFORCED COMPOSITE TARGET PIN DECK PLATE
  // Model thin heavy-impact base layer sheet designed to structurally ground pin formation arrangements
  const pinDeckGeometry = new THREE.BoxGeometry(3.5, 0.01, 5);
  // Differentiate target landing zone via high-visibility light grey satin texture skin profile
  const pinDeckMaterial = new THREE.MeshPhongMaterial({
    color: 0xD3D3D3,  // Matte silver industrial polymer overlay palette hex mapping index
    shininess: 40     // Neutral scatter threshold prevents overhead lamps from causing distracting glare paths
  });
  // Instantiate final standalone pin framework platform deck plate mesh in memory structure
  const pinDeck = new THREE.Mesh(pinDeckGeometry, pinDeckMaterial);
  // Center Z at -57.5, elevate Y to 0.101 to mount flush on top of lane surface without causing rendering artifact flickers
  pinDeck.position.set(0, 0.101, -57.5);
  // Enable structural plate floor skin to actively trace shadow distributions thrown from standing pins
  pinDeck.receiveShadow = true;
  // Mount target foundation plate mesh block into active root rendering scene layout group
  scene.add(pinDeck);

  // REGULATION FOUL LINE STRIPE
  // Model thin transverse flat boundary plane checking full 3.5 lane width with tight 0.08 depth striping
  const foulLineGeometry = new THREE.PlaneGeometry(3.5, 0.08);
  // Leverage basic material shaders to skip unnecessary lighting math updates on a pure static color vector line
  const foulLineMaterial = new THREE.MeshBasicMaterial({ color: 0xE74C3C }); // Standard red warning marker hue
  const foulLine = new THREE.Mesh(foulLineGeometry, foulLineMaterial);
  // Situate target intercept line precisely at Z = 0, elevating Y to 0.102 to clear lower floor bounds safely
  foulLine.position.set(0, 0.102, 0);
  // Pivot 2D plane geometry 90 degrees forward around local X-axis to lay face up flat on the floorboards
  foulLine.rotation.x = degrees_to_radians(-90);
  // Mount red threshold separator line mesh into live viewport graph configuration
  scene.add(foulLine);

  // APPROACH ALIGNMENT DOTS
  // Allocate circular geometry metrics tracking tight 0.04 radius curves handled via smooth 32-point perimeter interpolation loops
  const dotGeometry = new THREE.CircleGeometry(0.04, 32);
  const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 }); // Deep charcoal tracking indicator tint
  const dotPositionsX = [-1.2, -0.6, 0, 0.6, 1.2]; // Standard width track tracking positions
  const dotRowsZ = [2.0, 7.0]; // Dual length row markers mapping player step adjustments across the runway

  // Distribute alignment tracking dots across the approach layout grid using nested loop parsing structures
  dotRowsZ.forEach((zPos) => {
    dotPositionsX.forEach((xPos) => {
      const dot = new THREE.Mesh(dotGeometry, dotMaterial); // Build separate circular indicator instance geometry
      dot.position.set(xPos, 0.102, zPos); // Align marker directly over mapped intersection point, floating just over wood grains
      dot.rotation.x = degrees_to_radians(-90); // Tilt plane 90 degrees forward to overlay flat on runway deck
      scene.add(dot); // Save tracking instance node directly into live graphics scene index
    });
  });

  // LANE TARGETING CHEVRONS (AIMING ARROWS)
  // Restricting CircleGeometry bounds to exactly 3 perimeter loops generates clean, lightweight triangle vectors
  const arrowGeometry = new THREE.CircleGeometry(0.14, 3);
  const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 }); // Dark charcoal target mark fill
  
  // Configure explicit spatial mapping coordinates laying out a standard V-formation pattern pointing down-lane
  const arrowOffsets = [
    { x: 0, z: -15.0 },       // Core centerline apex tracking chevron target (exactly 15 units down-lane)
    { x: -0.4, z: -14.6 }, { x: 0.4, z: -14.6 }, // Primary interior tracking flank branch pairs
    { x: -0.8, z: -14.2 }, { x: 0.8, z: -14.2 }, // Secondary intermediate tracking chevron sets
    { x: -1.2, z: -13.8 }, { x: 1.2, z: -13.8 }  // Outer wing tracking limits bordering gutter edges
  ];

  // Instanciate and distribute each calculated targeting chevron structure down the lane channel
  arrowOffsets.forEach((offset) => {
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial); // Build new distinct triangle mesh element node
    arrow.position.set(offset.x, 0.102, offset.z); // Position target chevron onto designated wood floor lane coordinate slot
    arrow.rotation.x = degrees_to_radians(-90); // Flip 90 degrees forward around local X axis to lay completely flat
    arrow.rotation.z = degrees_to_radians(30); // Twist 30 degrees around local Z axis to orient the triangle vertex towards negative Z (pins)
    scene.add(arrow); // Save configured indicator mesh pointer directly into master scene render structure
  });
}

// Fire master infrastructure script to construct and place physical lane layouts inside virtual environment
createBowlingLane();


// ============================================================================
// 5. PROCEDURAL PIN ASSEMBLY & TRIANGULAR DEPLOYMENT
// ============================================================================

// Component factory scripting processing stacked primitive geometries to construct a unified regulation pin model group
function createBowlingPin() {
  // Instantiate empty parent Group node container to bundle and transform child component parts collectively
  const pinGroup = new THREE.Group();

  // Create ultra-glossy bright white finish settings matching regulation tournament composite protective plastic coatings
  const pinWhiteMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,   // Brilliant pure white hexadecimal tint definition mask
    shininess: 100     // Highly reflective specular profile generates clean mirror highlights from room lamps
  });

  // Create matching high-gloss dark crimson material properties to paint identifier neck trim bands
  const pinRedMaterial = new THREE.MeshPhongMaterial({
    color: 0xd32f2f,   // Standard tournament crimson red identifier hex value configuration
    shininess: 100     // Glossiness matching the white coat preserves physical coherence under light parsing passes
  });

  // PIN LOWER BELLY BODY COMPONENT
  // Generate a tapered cylinder to establish the wide lower body belly contours of a regulation pin shape
  const baseGeometry = new THREE.CylinderGeometry(0.2, 0.13, 0.55, 32);
  const baseMesh = new THREE.Mesh(baseGeometry, pinWhiteMaterial);
  // Elevate half its height vertically to establish base baseline seating precisely at internal pivot level Y = 0
  baseMesh.position.y = 0.275; 
  baseMesh.castShadow = true;     // Permit belly body polygons to block ray patterns and project dynamic shadows
  baseMesh.receiveShadow = true;  // Enable surface skins to trace surrounding shadow projections
  pinGroup.add(baseMesh);         // Bind lower belly child mesh structure into parent coordinate tracking folder group

  // PIN TAPERED SLENDER NECK COLUMN
  // Leverage inverted conical cylinder geometry maps to form the slender neck transitions of the pin structure
  const neckGeometry = new THREE.CylinderGeometry(0.08, 0.2, 0.45, 32);
  const neckMesh = new THREE.Mesh(neckGeometry, pinWhiteMaterial);
  // Position vertically right on top of base belly cylinder rim line boundary markers (0.55 base height + 0.225 half neck)
  neckMesh.position.y = 0.775;
  neckMesh.castShadow = true;     // Inject light blockage tracking properties
  neckMesh.receiveShadow = true;  // Enable ambient occlusion maps to overlay skin layers
  pinGroup.add(neckMesh);         // Bind bottleneck slice child mesh securely into parent transformation container group

  // PIN IDENTIFICATION RED NECK STRIPE BAND
  // Model thin hollow outer ring sleeve tracking slightly expanded radii values to cleanly sleeve neck faces without clipping artifacts
  const stripeGeometry = new THREE.CylinderGeometry(0.135, 0.145, 0.06, 32);
  const stripeMesh = new THREE.Mesh(stripeGeometry, pinRedMaterial);
  // Displace up target height path Y = 0.83 to locate identifier band precisely on bottleneck skin surface zone
  stripeMesh.position.y = 0.83;
  stripeMesh.castShadow = true;   // Calculate shadow traces thrown from contrasting colored identification trim sleeve rings
  stripeMesh.receiveShadow = true;// Permit environmental shadow mapping processing overlays
  pinGroup.add(stripeMesh);       // Bind identifier stripe mesh layer directly to parent coordinate folder grouping matrix

  // PIN ROUNDED HEAD CROWN CAP
  // Allocate perfect sphere primitive modeling the polished spherical dome crowning the top of the pin framework
  const headGeometry = new THREE.SphereGeometry(0.095, 32, 32);
  const headMesh = new THREE.Mesh(headGeometry, pinWhiteMaterial);
  // Position sphere right on top of neck rim line at absolute combined altitude level Y = 1.0 units
  headMesh.position.y = 1.0;
  headMesh.castShadow = true;     // Allow head cap polygons to calculate dynamic shadow casting transformations
  headMesh.receiveShadow = true;  // Accept incoming shadow projection masks safely
  pinGroup.add(headMesh);         // Lock upper head sphere slice inside the parent structural group container folder

  // Apply master scale modifications ensuring complete model envelope matches project size parameters (~1.25 units high)
  pinGroup.scale.set(1.15, 1.15, 1.15);

  // Return full integrated procedural pin assembly composite package folder back to triggering deployment loops
  return pinGroup;
}

// Master global array structure tracking 3D mesh instances and state tracking indices for pins
let pinsStateArray = [];

// Generates and registers structural pins while binding entries into the tracking state matrix
function deployPinFormation() {
  // Clear any existing residual meshes from previous operations out of the master system tracking index array
  pinsStateArray = [];

  // Supply precise regulation triangular layout position offset coordinates specified in target manual instructions
  const pinPositions = [
    { id: 1,  x:  0.0, z: -57.000 }, // Row 1 Apex Head Pin (exactly 57 units out from foul line tracking boundaries)
    
    { id: 2,  x: -0.5, z: -57.866 }, // Row 2 Left Flank boundary placement position
    { id: 3,  x:  0.5, z: -57.866 }, // Row 2 Right Flank boundary placement position
    
    { id: 4,  x: -1.0, z: -58.732 }, // Row 3 Left Outfield pocket pin element tracking locus
    { id: 5,  x:  0.0, z: -58.732 }, // Row 3 Absolute Center heart-line axis structural pin element
    { id: 6,  x:  1.0, z: -58.732 }, // Row 3 Right Outfield pocket pin element tracking locus
    
    { id: 7,  x: -1.5, z: -59.598 }, // Row 4 Back Left Wing terminal drop corner spot pin
    { id: 8,  x: -0.5, z: -59.598 }, // Row 4 Back Left Channel foundation base deck spot pin
    { id: 9,  x:  0.5, z: -59.598 }, // Row 4 Back Right Channel foundation base deck spot pin
    { id: 10, x:  1.5, z: -59.598 }  // Row 4 Back Right Wing terminal drop corner spot pin
  ];

  // Map along each position vector definition entry to initialize models and populate structural state metadata sheets
  pinPositions.forEach((pos) => {
    // Invoke factory script processing vectors to construct new autonomous 3D composite pin mesh collections
    const pinInstance = createBowlingPin();
    
    // Assign position updates. Set altitude level Y exactly to 0.101 so the bottom rim sits perfectly flush on top of deck plate skin layers
    pinInstance.position.set(pos.x, 0.101, pos.z);
    
    // Mount compiled transformed individual pin group structure into main viewable rendering scene node tree
    scene.add(pinInstance);
    
    // Push active structural state tracking objects into global tracking array
    pinsStateArray.push({
      id: pos.id,                        // Unique integer ID key corresponding with tournament layouts (1-10)
      mesh: pinInstance,                 // Live reference pointer tracking the actual 3D object inside Three.js graph
      initialX: pos.x,                   // Store baseline layout X alignment for resetting operations
      initialZ: pos.z,                   // Store baseline layout Z alignment for resetting operations
      isStanding: true,                  // Boolean tracking logic state verifying if pin remains standing upright
      isToppling: false,                 // State tracker verifying if pin is currently running through physics-free tumble actions
      toppleAngle: 0,                    // Float tracing structural progression of fall path rotation angles
      toppleDirection: new THREE.Vector3() // Vector3 reserving target direction paths for physics-free fall trajectories
    });
  });
}

// Execute deployment manager script to allocate and track all ten target pins over the back deck plate floor plan
deployPinFormation();


// ============================================================================
// 6. STATIC HIGH-POLISH POLYGON BOWLING BALL
// ============================================================================

// Declare global reference pointer variable tracking primary ball object for operational manipulation
let bowlingBall;

function createStaticBowlingBall() {
  // Initialize parent translation Group node to bundle spherical core shell and gripping channel holes collectively
  const ballGroup = new THREE.Group();

  // Model high-density sphere geometry using 64 width/height segment counts to generate pristine continuous curved curves
  const ballGeometry = new THREE.SphereGeometry(0.45, 64, 64);
  
  // Allocate ultra-glossy reflective material modeling polished deep cosmic violet shell skin behaviors
  const ballMaterial = new THREE.MeshPhongMaterial({
    color: 0x2e0854,   // Deep rich midnight cosmic violet plum purple hexadecimal color token reference
    shininess: 140     // Highly amplified specularity index catches room light tubes to trace glass-like mirror glints
  });

  // Compile geometry frameworks and material maps together into the primary structural core ball mesh node
  const ballCoreMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  // Instruct lighting passes to compute dynamic depth shadows tracking core spherical surface silhouettes
  ballCoreMesh.castShadow = true;
  // Permit surface layers to accept overlapping ambient environmental drop shadow mappings cleanly
  ballCoreMesh.receiveShadow = true;
  // Securely mount core shell sphere mesh child layer inside local component folder group container
  ballGroup.add(ballCoreMesh);

  // ASYMMETRIC DRILL PATHS MODELING (GRIPPING HOLES)
  // Define small cylinders to clip inner skin faces and simulate drilled finger channels
  const holeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.08, 16);
  // Select dead matte completely unlit pitch black color to mask interior hollow hole surfaces with void darkness profiles
  const holeMaterial = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });

  // Map typical asymmetric anatomical finger spread placement offset coordinates relative to top center surface skin zones
  const holeLayouts = [
    { x: -0.07, y: 0.38, z: -0.20, rotX: 60, rotY: -10 }, // Grip Channel A: Middle Finger drill alignment vector path
    { x:  0.07, y: 0.38, z: -0.20, rotX: 60, rotY:  10 }, // Grip Channel B: Ring Finger drill alignment vector path
    { x:  0.00, y: 0.28, z:  0.32, rotX: -40, rotY:  0 }  // Grip Channel C: Traditional single Thumb deep anchor slot line
  ];

  // Run iterations over alignment mapping sets to sink, pivot, and mount gripping holes into core ball face layers
  holeLayouts.forEach((holeData) => {
    const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial); // Build autonomous hollow dark cylinder geometry channel index
    holeMesh.position.set(holeData.x, holeData.y, holeData.z);   // Align hole cylinder origin to clip outer sphere face parameters
    
    // Pivot individual cylinder tracks pointing inward toward core node center to mimic authentic drill profiles
    holeMesh.rotation.x = degrees_to_radians(holeData.rotX);
    holeMesh.rotation.y = degrees_to_radians(holeData.rotY);
    
    ballGroup.add(holeMesh); // Mount configured dark gripping ring mesh child into local parent ball system folder
  });

  // INITIAL PLACEMENT MATH: Approach platform top level sits at Y = 0.1. Bounding sphere core radius tracks at 0.45.
  // Translation equation: Y = 0.1 (floor level) + 0.45 (radius offset) = 0.55. Centering X at 0 and resting 4 units back on runway Z = 4.
  ballGroup.position.set(0, 0.55, 4);

  // Tilt full group 45 degrees forward around X axis so all 3 structural finger holes face upward towards default view perspective
  ballGroup.rotation.x = degrees_to_radians(45);
  
  // Save parent transformation bundle address directly into the global tracking pointer variable
  bowlingBall = ballGroup;
  
  // Commit fully integrated composite ball group system mesh architecture straight into master active render graph tree index
  scene.add(ballGroup);
}

// Trigger bowling ball building script module to place polished reactive sphere entity onto player approach runway track
createStaticBowlingBall();


// ============================================================================
// 7. CAMERA DESKTOP ORIENTATION VANTAGE STANDPOINT CONFIGURATION
// ============================================================================

// Initialize empty transformation identity matrix block tracking camera spatial coordinate displacements
const cameraTranslate = new THREE.Matrix4();
// Configure translation metrics: No horizontal pan (X=0), elevate look point over walkway (Y=5), draw behind approach lane line (Z=12)
cameraTranslate.makeTranslation(0, 5, 12);
// Apply compiled layout matrix operations into camera container properties to establish default stationary bowler viewpoint frame
camera.applyMatrix4(cameraTranslate);


// ============================================================================
// 8. INTERACTIVE DESKTOP CONSOLE RECEPTION ACTION INTERACTION CODE
// ============================================================================

// Bind raw camera transformations to OrbitControls monitoring mouse drag coordinates across graphics viewport drawing window canvas
const controls = new OrbitControls(camera, renderer.domElement);

// Instantiate master boolean state tracker evaluating if mouse drag scene tracking loops are allowed operation clearances
let isOrbitEnabled = true;
// Manage current tracking perspective mode splits ('bowler' perspective vs 'pin' landing perspective)
let currentView = "bowler";

// Monitor and parse alphanumeric key codes clicked by the user client down into input handling workflows
function handleKeyDown(e) {
  // Check if keyboard keystroke registers an upper or lower-case instance match for the "O" key
  if (e.key === "o" || e.key === "O") {
    // Invert the boolean logic status variable value cleanly using an algebraic logic inverse switch command
    isOrbitEnabled = !isOrbitEnabled;
  }
  
  // Parse perspective camera layout toggle requests monitoring triggers on the "V" key
  if (e.key === "v" || e.key === "V") {
    if (currentView === "bowler") {
      // Snap control focus target matrices precisely onto center coordinate tracks of rear pin deck plate platform
      controls.target.set(0, 1, -57);          
      // Position camera entity slightly ahead and above pin array formations to get clear tracking vantage frames
      camera.position.set(0, 3, -50);          
      currentView = "pin";
    } else {
      // Revert focus matrices back onto standard baseline starting layout foul line markings intercept zones
      controls.target.set(0, 0, 0);            
      // Restore camera coordinate offsets back onto starting approach runway baseline targets
      camera.position.set(0, 5, 12);           
      currentView = "bowler";
    }
    // Command OrbitControls to compile and register revised viewport transformation vectors immediately
    controls.update();
  }

  // Verify system phase permits operational adjustment updates
  if (gameState.phase === 'aiming') {
    // Determine strict scaling modifier to dictate movement distance per active keystroke tap
    const movementStep = 0.1;
    // Calculate physical clamping boundary. Lane width is 3.5, half is 1.75. We clamp to 1.3 to avoid early gutter clips.
    const maxEdgeLimit = 1.3;

    if (e.key === 'ArrowLeft') {
      // Subtract translation step from global state aiming tracker to drift ball towards negative X (left)
      gameState.ball.aimX -= movementStep;
      // Evaluate if updated position violates left boundary hard limit, and clamp directly to threshold if true
      if (gameState.ball.aimX < -maxEdgeLimit) gameState.ball.aimX = -maxEdgeLimit;
      // Pipe confirmed coordinate math directly into the live bowling ball group mesh X position offset vector
      bowlingBall.position.x = gameState.ball.aimX;
    }
    
    if (e.key === 'ArrowRight') {
      // Add translation step to global state aiming tracker to drift ball towards positive X (right)
      gameState.ball.aimX += movementStep;
      // Evaluate if updated position violates right boundary hard limit, and clamp directly to threshold if true
      if (gameState.ball.aimX > maxEdgeLimit) gameState.ball.aimX = maxEdgeLimit;
      // Pipe confirmed coordinate math directly into the live bowling ball group mesh X position offset vector
      bowlingBall.position.x = gameState.ball.aimX;
    }

    // MILESTONE 3: ADDING INTERACTIVE SPIN ADJUSTMENT HOOKS
    if (e.key === 'ArrowUp') {
      // Increase the hook vector coefficient to introduce a positive curve drift acceleration (curves rightward)
      gameState.ball.spinHook += 0.5;
      // Log to console so bowler can evaluate raw numerical curve vectors applied before launch
      console.log(`Spin Vector Increased: ${gameState.ball.spinHook}`);
    }

    if (e.key === 'ArrowDown') {
      // Decrease the hook vector coefficient to introduce a negative curve drift acceleration (curves leftward)
      gameState.ball.spinHook -= 0.5;
      // Log to console so bowler can evaluate raw numerical curve vectors applied before launch
      console.log(`Spin Vector Decreased: ${gameState.ball.spinHook}`);
    }
  }
  
  // SPACEBAR TIMING & LAUNCH INTERFACE ROUTER
  if (e.key === ' ') {
    // Gateway 1: Transition from setup aiming phase into active power charging oscillation cycle
    if (gameState.phase === 'aiming') {
      // Lock X coordinate offset and update global phase string flag
      gameState.phase = 'power';
      // Un-hide the HTML power gauge DOM interface element to provide visual charging feedback to the user
      powerMeterContainer.style.display = 'block';
      // Reset the internal timing accumulator to guarantee the oscillation sine wave starts at a predictable 0 origin
      gameState.ball.powerOscillationTime = 0;
    } 
    // Gateway 2: Freeze power charging oscillation cycle, calculate velocity vectors, and release the ball
    else if (gameState.phase === 'power') {
      // Lock current power scale multiplier and advance system phase into kinematic evaluation loops
      gameState.phase = 'rolling';
      // Hide the power gauge DOM interface element now that charging input is frozen and complete
      powerMeterContainer.style.display = 'none';
      
      // Calculate derived launch velocity. Base minimum throw speed is 15. Absolute maximum theoretical speed is 45.
      const launchSpeed = 15 + (30 * gameState.ball.powerScale);
      
      // Assign the computed scalar velocity straight into the Z-axis of our master tracking velocity Vector3.
      // Value is negative because the lane extends into negative Z-coordinate space.
      gameState.ball.velocity.set(0, 0, -launchSpeed);
    }
  }
  
  if (e.key === 'r' || e.key === 'R') {
    // Handled in Milestone 6: Execute master reset routine restoring game state records to baseline values
  }
}

// Bind keyboard tracking function listeners directly onto browser document frame runtime channel pipelines
document.addEventListener('keydown', handleKeyDown);


// ============================================================================
// 9. VIEWPORT RESOLUTION DYNAMIC RESPONSIVENESS MODULE
// ============================================================================

// Adaptive callback recalculating aspect ratios and matching vector shapes when viewport screens get resized or deformed
function onWindowResize() {
  // Re-evaluate fractional camera width/height ratios to match updated browser canvas container bounds
  camera.aspect = window.innerWidth / window.innerHeight;
  // Order camera internal projection systems to build revised frustum field projection matrices to avoid shape distortion stretching bugs
  camera.updateProjectionMatrix();
  // Adjust hardware graphics renderer view block pixels to track modified window outline scale limits perfectly
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Map window size transformation handler routines to listen directly to native system viewport resize pipeline signals
window.addEventListener('resize', onWindowResize, false);


// =============================================================================
// 10. HW06 GLOBAL GAME STATE MACHINE ARCHITECTURE 
// =============================================================================

// Object model organizing game metadata records, tracking array matrices, scorecard registries, and state flags
const gameState = {
  currentFrame: 1,
  currentRoll: 1,
  phase: 'aiming',
  
  ball: {
    aimX: 0.0,                         // Current horizontal offset positioning of ball along the foul line channel
    spinHook: 0.0,                     // MILESTONE 3: Active curve force factor applied iteratively to horizontal drift
    isGutter: false,                   // MILESTONE 3: Boolean state tracking if ball has breached lane boundaries into channels
    resolveTimer: 0.0,                 // MILESTONE 3: Simple frame accumulator used to handle automated temporary testing resets
    powerScale: 0.0,                   // Scalar tracing power charge metrics from timing bar gauge inputs (0.0 to 1.0 caps)
    powerOscillationTime: 0.0,         // Timing accumulator tracking elapsed seconds specifically for the sine wave power calculation
    velocity: new THREE.Vector3(0,0,0) // Physical 3D velocity vector managing displacement integration loops inside frame cycles
  },
  
  scorecard: Array.from({ length: 10 }, (_, index) => ({
    frameIndex: index + 1,             
    rolls: [],                         
    cumulativeTotal: null,             
    isStrike: false,                   
    isSpare: false                     
  })),
  
  pinsStandingCount: 10
};


// =============================================================================
// 11. HW06 UI: EXTENDING CONTROLS PANEL & DYNAMIC POWER METER OVERLAYS
// =============================================================================

// Target default controls guide element box injected from HTML script headers
const instructionsElement = document.getElementById('controls-container');

// Re-write inner text block inside tracking container to clearly outline interactive bowling shortcuts
if (instructionsElement) {
  instructionsElement.innerHTML = `
    <h3>Alley & Game Controls</h3>
    <p><span class="key-badge">O</span> Toggle Orbit Camera Controls</p>
    <p><span class="key-badge">Mouse Click + Drag</span> Rotate Camera View</p>
    <p><span class="key-badge">Scroll Wheel</span> Zoom View In/Out</p>
    <p><span class="key-badge">Left / Right Arrow</span> Aim / Move Ball Position</p>
    <p><span class="key-badge">Up / Down Arrow</span> Adjust Hook / Spin Curve Vector</p>
    <p><span class="key-badge">Spacebar</span> Start Gauge / Lock Power & Release</p>
    <p><span class="key-badge">R</span> Reset Simulation / New Game</p>
    <p><span class="key-badge">V</span> Toggle Bowler vs Pin-End Vantage Views</p>
  `;
}

// DYNAMIC POWER METER UI INJECTION
const powerMeterContainer = document.createElement('div');
powerMeterContainer.style.position = 'absolute';
powerMeterContainer.style.bottom = '50px';
powerMeterContainer.style.left = '50%';
powerMeterContainer.style.transform = 'translateX(-50%)';
powerMeterContainer.style.width = '300px';
powerMeterContainer.style.height = '25px';
powerMeterContainer.style.background = 'rgba(20, 24, 42, 0.8)';
powerMeterContainer.style.border = '2px solid white';
powerMeterContainer.style.borderRadius = '12px';
powerMeterContainer.style.display = 'none';
powerMeterContainer.style.overflow = 'hidden';

const powerMeterFill = document.createElement('div');
powerMeterFill.style.height = '100%';
powerMeterFill.style.width = '0%';
powerMeterFill.style.background = '#2ecc71';
powerMeterFill.style.transition = 'none';

powerMeterContainer.appendChild(powerMeterFill);
document.body.appendChild(powerMeterContainer);


// =============================================================================
// 12. HW06 MASTER PHYSICS ENTRY & STATE RESOLUTION LOOPS
// =============================================================================

// Unified update controller parsing elapsed framerate timings to update positions and structural checks
function updateGame(deltaTime) {
  
  // OSCILLATING POWER CHARGE TIMING LOOP
  if (gameState.phase === 'power') {
    // Accumulate hardware delta time fractions scaled by a factor of 4 to accelerate oscillation frequency cycles
    gameState.ball.powerOscillationTime += deltaTime * 4.0;
    // Map standard continuous Sine wave results (-1.0 to 1.0) into strict fractional scalar metrics (0.0 to 1.0 caps)
    gameState.ball.powerScale = (Math.sin(gameState.ball.powerOscillationTime) + 1.0) / 2.0;
    // Bind current power fraction directly to the width percentage of our visual interface bar element
    powerMeterFill.style.width = `${gameState.ball.powerScale * 100}%`;
    
    // Dynamic color tier sorting updates providing clear visual feedback thresholds
    if (gameState.ball.powerScale < 0.33) {
      powerMeterFill.style.background = '#2ecc71'; // Low capacity tier mapped to emerald green
    } else if (gameState.ball.powerScale < 0.66) {
      powerMeterFill.style.background = '#f1c40f'; // Mid capacity tier mapped to warning yellow
    } else {
      powerMeterFill.style.background = '#e74c3c'; // Max capacity tier mapped to alert crimson red
    }
  }

  // MILESTONE 3: KINEMATIC INTEGRATION ENGINE & DETECTORS
  if (gameState.phase === 'rolling') {
    
    // 1. Hook/Curve Dynamics Physics: Evaluate if ball is traveling down clean wood lanes rather than drainage gutters
    if (!gameState.ball.isGutter) {
      // Apply constant lateral acceleration driven by spin hook inputs to alter horizontal velocity components over elapsed time frames
      gameState.ball.velocity.x += gameState.ball.spinHook * deltaTime;
    }

    // 2. Analytical Euler Integration: Advance 3D positions sequentially derived from active velocity vector capacities
    bowlingBall.position.x += gameState.ball.velocity.x * deltaTime; // Displace position along the horizontal width track
    bowlingBall.position.z += gameState.ball.velocity.z * deltaTime; // Displace position along the forward depth track towards the pit

    // 3. Procedural Rotation Modeling: Calculate continuous visual rotation matching circumstantial wheel roll physics speeds
    // Linear velocity equals angular velocity multiplied by radius ($V = \omega \cdot R$). Therefore $\omega = V / R$. Bounding radius = 0.45.
    const forwardLinearSpeed = Math.abs(gameState.ball.velocity.z); // Extract absolute velocity component traversing down-lane
    bowlingBall.rotation.x += (forwardLinearSpeed / 0.45) * deltaTime; // Increment angular displacement around local X axis to simulate true roll traction

    // 4. Boundary Gutter Ball Detection: Evaluate if ball horizontal extent crosses past physical lane limits (|x| > 1.75 wide)
    if (!gameState.ball.isGutter && Math.abs(bowlingBall.position.x) > 1.75) {
      gameState.ball.isGutter = true;                    // Flip systemic evaluation status flag to enforce gutter tracking rules
      bowlingBall.position.y = -0.05;                    // Depress ball altitude down flush into the physical drop channel floor plane
      gameState.ball.velocity.x = 0;                     // Wipe out all lateral velocity components immediately so the ball slides purely straight down the gutter
      console.log("Gutter Ball Detected! Ball dropped into side channel floor tracking tracks.");
    }

    // 5. Pit Terminal Boundary Detection: Identify when rolling sphere reaches the absolute end limits of the pin layout zone
    if (bowlingBall.position.z <= -60.0) {
      gameState.ball.velocity.set(0, 0, 0);              // Freeze all structural velocity components to bring the ball mesh to a dead halt in the pit
      gameState.phase = 'resolving';                     // Advance global state machine phase string flag to transition into resolution pipelines
      gameState.ball.resolveTimer = 0.0;                 // Initialize local safety frame accumulator timer for Milestone 3 testing stability
      console.log("Terminal Boundary Breached: Ball came to rest at pin end. Transitioning to 'resolving' state phase.");
    }
  }

  // MILESTONE 3 INTERLOCK SAFETY HARNESS: Automated testing loop preventing soft-locks before Milestone 6 resets are written
  if (gameState.phase === 'resolving') {
    // Accumulate framework timeline metrics inside tracking safety variable
    gameState.ball.resolveTimer += deltaTime;
    // Allow a 2-second visual pause frame at the pin deck so players can observe final roll placement coordinates
    if (gameState.ball.resolveTimer > 2.0) {
      gameState.ball.aimX = 0.0;                         // Reset horizontal aiming storage tracking coordinates to 0
      gameState.ball.spinHook = 0.0;                     // Purge active hook vectors to reset ball drift variables to baseline
      gameState.ball.isGutter = false;                   // Re-assert baseline non-gutter logic validation flags
      bowlingBall.position.set(0, 0.55, 4);              // Translate ball group position back to starting stance on approach runway track
      bowlingBall.rotation.set(degrees_to_radians(45), 0, 0); // Restore initial forward angle profile where finger holes tilt up
      gameState.phase = 'aiming';                        // Return control authority to the player aiming input router systems
      console.log("Milestone 3 Safety Loop Triggered: Ball successfully reset to approach lane. Ready for next test throw.");
    }
  }
}


// =============================================================================
// 13. MASTER RENDERING & SYSTEM ANIMATION LOOP
// =============================================================================

// Initialize internal Three.js high-resolution timestamp clock tracker to record performance intervals accurately
const runtimeClock = new THREE.Clock();

function animate() {
  // Schedule frame rendering loop callbacks to sync with graphics monitor hardware update refresh marks
  requestAnimationFrame(animate);

  // Capture precise fraction time segments elapsed since the immediately prior computation cycle pass
  const deltaTime = runtimeClock.getDelta();

  // Pipe delta execution timings down into physics managers to keep calculations completely standard across separate hardware systems
  updateGame(deltaTime);

  // Manage orbit interaction capability tracking blocks based on toggle settings overrides.
  // We enforce a rule to strictly disable OrbitControls while the ball is rolling down the lane to prevent perspective interference.
  controls.enabled = isOrbitEnabled && (gameState.phase !== 'rolling');
  
  // Process tracking matrices inside controls module to update camera perspective adjustments safely
  controls.update();

  // Execute rendering operations mapping current 3D world scene layers down onto active viewport pixels
  renderer.render(scene, camera);
}

// Ignition sweep: Fire master animation routine loop to initialize game runtime environments
animate();
