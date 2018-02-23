# Selection Bias in News Coverage: Learning it, Fighting it
by Dylan Bourgeois, Jérémie Rappaz, Karl Aberrer

> Accepted for oral presentation at the Alternate Track on  Journalism, Misinformation, and Fact-checking at The Web Conference 2018.

## Context

This post aims to support our work on selection bias in the context of news coverage. The paper can be found here [TODO]. We present the motivation for the project, and an interactive data visualisation of the learned relationships between news sources.

## Abstract

The world’s events are no longer reported through a daily condensate, rather a continuous stream of events, dispatched by the world’s largest media organizations. From local news to global headlines, the event space is much too large to be treated exhaustively: news entities have to select and filter the coverage they broadcast through their respective channels. The subjective nature of this filtering induces biases due to, among other things, resource constraints, editorial guidelines, ideological affinities, or even the fragmented nature of the information at a journalist’s disposal. The magnitude and direction of this bias are, however, widely unknown. The absence of ground truth, the sheer size of the event space, or the lack of an exhaustive set of absolute features to measure makes it diffcult to observe the bias directly, to characterize the leaning’s nature and to factor it out to ensure a neutral coverage of the news.

In this work, we introduce a methodology to capture the latent structure of media’s decision process at a large scale. Our contribution is multi-fold. First, we show media coverage to be predictable using personalization techniques, and evaluate our approach on a large set of events collected from the GDELT database. We then show that a personalized and parametrized approach not only exhibits higher accuracy in coverage prediction, but also provides an interpretable representation of the selection bias. Last, we propose a method able to select a set of sources by leveraging the latent representation. These selected sources provide a more diverse and egalitarian coverage, all while retaining the most actively covered events.


---

#### Acknowledgements

This website uses snippets or inspiration from many of the following places:

* [d3.js](https://d3js.org/)
* [John Huynh’s Block 9c94ab01d8c3ed8ea3821d4a7e119b07](https://bl.ocks.org/floofydugong/9c94ab01d8c3ed8ea3821d4a7e119b07)
* [Skeleton CSS](http://getskeleton.com/#examples)
* [Voronoi Scatter Plots](https://github.com/pbeshai/pbeshai.github.io/blob/master/vis/scatterplot-voronoi/scatterplot-voronoi.js)
* Many wonderful stackoverflow answers ...
