
import * as PARTICLES from "pixi-particles";

class ParticleSystem {
    emit(target, images, options) {
        const emitter = new PARTICLES.Emitter(

            // The PIXI.Container to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the root stage Container
            target.view,

            // The collection of particle images to use
            images.map(image => PIXI.Texture.from(image)),

            // Emitter configuration, edit this to change the look
            // of the emitter
            options
        );

        // Calculate the current time
        let elapsed = Date.now();

        // Update function every frame
        const update = () => {

            // Update the next frame
            requestAnimationFrame(update);

            const now = Date.now();

            // The emitter requires the elapsed
            // number of seconds since the last update
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;

            // Should re-render the PIXI Stage
            // renderer.render(stage);
        };

        // Start emitting
        emitter.emit = true;

        // Start the update
        update();
        return emitter;
    }
}

export let particlesSystem = new ParticleSystem();
