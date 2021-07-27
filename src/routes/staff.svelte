<script>
	import StaffMember from '$lib/components/StaffMember.svelte';
</script>

<div class="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8 lg:py-12">
	<h2>Staff</h2>
	<!-- <p class="text-xl text-gray-500">Nulla quam felis, enim faucibus proin velit, ornare id pretium. Augue ultrices sed arcu condimentum vestibulum suspendisse. Volutpat eu faucibus vivamus eget bibendum cras.</p> -->

	<div class="md:grid md:grid-cols-3 md:gap-8 space-y-12 md:space-y-0">
		<StaffMember name="Dan Bowdoin" title="CEO/Founder" imageURL="/images/danbowdoin.jpg">
			<p class="text-gray-500">
				Dan has been involved on the running scene since 1995 when he first started competing in
				all-comer meets in elementary school. The 800 meters being the favorite event! Having
				experience as a competitor, coach, and meet director...he turned to providing timing
				solutions for his local school district in 2010, where he taught middle school math. This
				soon evolved into founding Athletic Timing to provide cutting edge technology in live
				results through the use of FAT timing and rfid chip timing systems. In 2016, Athletic Timing
				reached the milestone of timing over 100 events during the year.
			</p>
			<p class="text-gray-500">
				Dan also co-directs the Oregon Middle School Meet of Champions, the nation's largest middle
				school meet with over 240 teams looking to submit qualifying entries, each year.
			</p>

			<div>
				<a href="mailto:dan@athletictiming.net" class="text-blue-800 hover:text-blue-900 mr-5">
					<i class="far fa-envelope" />
					Contact Dan
				</a>
				<a sveltekit:prefetch
					href="http://www.athletic.net/TrackAndField/School.aspx?SchoolID=62784"
					target="_blank"
					class="text-gray-800 hover:text-gray-900 whitespace-nowrap"
				>
					<i class="far fa-calendar-alt" />
					Current Schedule
				</a>
			</div>
		</StaffMember>

		<div
			class="md:col-span-2 space-y-12 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
		>
			<StaffMember name="Kim Motylewski" title="Director of Operations">
				<p class="text-gray-500">FinishLynx/Event Management Operations</p>
				<div>
					<a href="mailto:kim@athletictiming.net" class="text-blue-800 hover:text-blue-900 mr-5">
						<i class="far fa-envelope" />
						Contact Kim
					</a>
				</div>
			</StaffMember>
			<StaffMember name="Monica Barnhart">
				<p>FinishLynx/Event Management Operations</p>
			</StaffMember>
			<StaffMember name="Liz McCullough">
				<p>MeetPro/Finish Line Operations</p>
			</StaffMember>
			<StaffMember name="Emily Vala-Haynes">
				<p>MeetPro/FinishLynx Operator</p>
			</StaffMember>
			<StaffMember name="Janell Teach">
				<p>MeetPro/Finish Line Operations</p>
			</StaffMember>
			<StaffMember name="Drake Knowles">
				<p>MeetPro/Finish Line Operations</p>
			</StaffMember>
		</div>
	</div>
</div>

<style>
	h2 {
		@apply text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-primary;
	}
	p {
		@apply text-gray-500;
	}
</style>
