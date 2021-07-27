<script>
	import { page } from '$app/stores';
import RecentAndUpcomingEvents from './schedule/_RecentAndUpcomingEvents.svelte';
</script>

<div class="home-cover text-center">
	<div class="cover-overlay" />
	<h1 class="home-title text-4xl font-semibold" style="margin-bottom: 15px;">
		Events Results Management
	</h1>
	<h3 class="home-subtitle text-2xl" style="margin-bottom: 35px;">Simple. Fast. Professional.</h3>

	<div class="relative z-[1]">
		{#if $page.query.get('results') === 'live'}
			<a sveltekit:prefetch href="https://live.athletictiming.net" target="_blank" class="px-3 py-2 bg-white hover:bg-gray-100 rounded font-medium"
				>Live Track & Field Results</a
			>
			<a sveltekit:prefetch href="/schedule" class="px-3 py-2 bg-white hover:bg-gray-100 rounded font-medium">Live Road Racing Results</a>
		{:else}
			<a sveltekit:prefetch href="/schedule" class="px-3 py-2 bg-white hover:bg-gray-100 rounded font-medium">View Results & Schedule</a>
		{/if}
	</div>
</div>

<div class="max-w-5xl mx-auto px-2 md:px-4">
	<RecentAndUpcomingEvents context="home" />
</div>

<div style="text-align: center; padding: 45px 16px; background: #eee;">
	<div class="max-w-5xl mx-auto px-4">
    <div class="text-xl mb-8">
      A successful Track & Field, Cross Country, or Road Race event requires long-term planning and attention
      to many details. Athletic Timing can assist you in any aspect of organizing and running your event.
      Let us take the stress out of managing your finish line!
    </div>
		<a href="mailto:dan@athletictiming.net"  class="px-3 py-2 bg-primary hover:bg-primary-light text-white rounded font-medium">
			<i class="far fa-envelope" /> Contact Us to Book Your Event</a
		>
	</div>
</div>

<div class="max-w-5xl mx-auto px-4">
	<div style="margin-bottom: 50px; margin-top: 40px; text-align: center;">
		<h1 class="font-semibold text-4xl mb-5">A Full Suite of Services</h1>
		<i class="font-semibold"
			>As Oregon’s premier timing company for Track & Field and Cross Country, we make it easy to
			run your finish line.</i
		>
	</div>

	<div class="feature-grid mx-auto">
		<section>
			<span class="icon">
				<i class="fas fa-video fa-5x" />
			</span>
			<h2>Finish Line Management</h2>
			<p>
				We can provide two Lynx System cameras for your finish line. The FinishLynx camera is
				accurate to 1/2000th of a second and produces high quality images to eliminate any
				discrepancies in determining the order of finish. The IdentiLynx video camera is also
				available for reading bib numbers in cross country races or longer race distances on the
				track.
			</p>
		</section>

		<section>
			<span class="icon">
				<i class="fas fa-list-ol fa-5x" />
			</span>
			<h2>Results Management</h2>
			<p>
				You will receive copies of the results both individually after each event and as a summary
				at the conclusion of the meet. Team scores are tallied after each event. Complete results
				are uploaded to
				<a href="https://www.athletic.net">Athletic.net</a> and posted to our website. Upon request,
				results can be submitted to media outlets.
			</p>
		</section>

		<section>
			<span class="icon">
				<i class="fas fa-cloud-upload-alt fa-5x" />
			</span>
			<h2>Live Results</h2>
			<p>
				A custom website will be set up and anyone with internet access can view results as soon as
				each event is completed. Coaches and spectators can also view these same results from their
				smartphone. Upon request, any event information can be included as well.
			</p>
		</section>

		<section>
			<span class="icon">
				<i class="fas fa-newspaper fa-5x" />
			</span>
			<h2>Data Management</h2>
			<p>
				Our software automatically seeds the meet based on various formulas, prepares the
				heat/flight sheets, and can handle advancement procedures from prelims to finals. All
				paperwork (meet program, start line heat sheets, field event sheets) can be emailed to the
				meet director prior to the meet date. We can provide printed copies of heats/flights the day
				of the meet, as well.
			</p>
		</section>

		<section>
			<span class="icon">
				<i class="fas fa-desktop fa-5x" />
			</span>
			<h2>Online Entries</h2>
			<p>
				Online entries through
				<a href="https://www.athletic.net">Athletic.net</a> will be completed for all Track & Field and
				Cross Country meets. We can help set up the meet in advance and utilize the Communicate/Invite
				feature to notify teams of the meet listing. We will ensure all meet setting have been configured,
				such as: deadline for entries, race divisions, entry limits, public/private entries, private
				meet lock, meet records activated, and whether you will be accepting only Official seeds.
			</p>
		</section>

		<section>
			<span class="icon">
				<i class="far fa-check-square fa-5x" />
			</span>
			<h2>Meet Management</h2>
			<p>
				If you're hand-timing your meet, we can still help eliminate some of the work by providing
				you with the following:
			</p>
			<div>
				- Setup and help manage online meet entries<br />
				- Heating & seeding of all events emailed to you one day before your meet<br />
				- Compiled meet results posted and marked Official on
				<a href="https://www.athletic.net">Athletic.net</a>
			</div>
		</section>
	</div>

	<section style="margin-top: 40px; margin-bottom: 35px;">
		<span class="icon">
			<i class="fas fa-question fa-5x" />
		</span>
		<h2>Support / Help</h2>
		<p>
			Whether you're planning a meet or considering the purchase of your own system, we are here to
			help. Training is available for both FinishLynx and Hy-Tek. Assistance and tips on how to
			organize volunteers to provide timing for your own meet can be shared, as well!
		</p>
	</section>

	<!-- <section fxFlex="50">
      <span class="icon">
        <i class="fas fa- fa-5x"></i>
      </span>
      <h2>Still to Categorize</h2>
      <p>
        We provide a variety of timing services and options, at competitive prices. We offer FAT timing and IPICO rfid chip timing,
        as well as meet registration and management services. Make your meet stand out with us; we have multiple LED sign
        boards for instant display of results.
      </p>
    </section> -->
</div>

<div style="text-align: center; font-size: 120%; padding: 30px 5px 45px; background: #eee;">
	<div class="max-w-5xl mx-auto px-4">
		<!-- <hr style="width: 50%; border-color: #17355d; margin: 30px auto;" /> -->
		<h3 class="font-semibold mb-2">
			Interested in hiring Athletic Timing to work your event?
			<!-- Contact us today to schedule services or for pricing information. -->
		</h3>
		<p style="margin-bottom: 20px;">
			Be sure to check the calendar of events for which our timing services have already been
			scheduled. We regularly book a year in advance, for invitationals, and fill in league meets
			soon after they are announced. Then contact us to schedule services or for pricing
			information.
		</p>
		<a sveltekit:prefetch href="/schedule" class="mr-1 px-3 py-2 bg-white hover:bg-gray-100 rounded font-medium shadow-md">
			<i class="far fa-calendar-alt" /> Scheduled Meets</a
		>
		<a href="mailto:dan@athletictiming.net" class="px-3 py-2 bg-primary hover:bg-primary-light text-white rounded font-medium shadow-md">
			<i class="far fa-envelope" /> Book Your Event</a
		>
	</div>
</div>

<style>
	h2 {
		@apply text-2xl my-3;
	}
	section {
		text-align: center;
	}
	p {
		color: #444444;
	}
	.home-cover {
		background-image: url(https://lh3.googleusercontent.com/Hvyiy7mhkbLWUwBljzl9XmQG__9q-HQjZFFjpDp2sv3crEBFwnMxk-UWSrgPr44hlSYlb_Zui-CAF5N_V_BPvCA=w1922);
		/* background-image: url(https://www.athletic.net/images/homepage/track_start-2000x1333.jpg); */
		background-size: cover;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		position: relative;
		padding: 3.5rem 0 4rem;
	}
	.cover-overlay {
		@apply absolute z-0 inset-0 opacity-50 bg-primary;
	}
	.home-title,
	.home-subtitle {
		color: #fff;
		z-index: 1;
		position: relative;
	}
	.icon {
		@apply text-primary;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 35px;
	}
</style>
