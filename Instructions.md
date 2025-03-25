
Speaker 2
But in our case, it's important because then if I go to my app, for example, you see that it's still being able to get the block hoss right, because, the preview gap doesn't use the more data but the preview which is rendered in thecope uses the Mark wise blog.
Okay, here. Okay, I should have done it differently, but anyway, you can say that I. Yeah, I use the MOC data here, so that's okay. So just make sure that let's see what you did. You have context all of a client and then a poll to do. Provided.
The provider is the client. You don't need both. You see, you have a poor client and a pole to the Mir. So make sure you only have a PO to the provider and make sure that it supports MOC data.
So if you pass mark as a proper as a prop, then it uses data from here. You see, at the to do item, you can add morec data here. Yes, you have the link for Ascope, right?
01:37
user
Rohit
No.
01:37
Speaker 2
So you can see the comparison. So see what I did with an Apollo block provider and try to implement the same thing.
But you see that actually, it either returns an actual Apollo client or it retains a mocked provider. Okay. Okay, that is clear? This part, like the Mock provider and the Apollo client. Okay. And it's important again, especially for the previews, because you want people to be able to go to your scope and see everything actually being rendered, right?
Right now I think if I'll go to your scope, I'll see any errors. Let's see. Let's go to do a can you spin up the break I guess. But if I add something. Okay, anyway, still make sure that you have another thing that to-do item over here, you have to move it to the UI and so in your workspace there's, it's actually to move it actually to rename.
Okay, you have to run a bit rename. Maybe you can even do it now later. Like, let's talk about other stuff. But we can do this part later just so that it doesn't appear here, because we usually have only the app at the boot and everything else in next piece.
Okay, another thing. Another thing is, just go over your code, clean it up a little bit, okay? Because, just so people. So it's easier for people in hands to do it.
So previously it was simple to do app. So then I added functionality like can create a page, you can have a quick notes, you can have the backlog and all. So that. That's why I use, like, new comp. New UI.
And then, deleted previous one.
Okay, I'll change the name, though. I mean, you can change the name so everything would be just to do an item. I mean, I always just think about the sort of journey you went through with Bit.
It's complicated to say the least, right? I mean, it's completely different from anything else we're doing. It doesn't look like a regular project. The documentation may not be enough, and we don't have an extensive open-source community.
So for people looking at your project, we should try to make it as simple as possible because otherwise, they just won't get it. So we have to change the names. I'll show you, like, how to change a name, how to rename, how to do all that. We can even do this part together if you want to.
Can you just do it here then, and like, make a PR so I can directly change it so we can have that as a reference on the GitHub issues? Like, this was the issue, and then we rectified it. Kind of a thing.
Okay, it doesn't matter if I do it or you. I mean, you will do it together, but yeah, okay, I'll do it here, and but I think you should see what I'm doing, okay?
Yeah, so first let's make the GitHub issue, and then we can, it's like it will be referred to as this is not the common way of doing the expected way.
Because that's okay. Yeah.
So this should be the changes kind of a thing on the GitHub issue. And then we can submit a new PR with it. Are you doing the PR? Make it. Yeah, like, at the time, I was facing a lot of issues in Ripple CI, yeah, then slowly, one by one, I fixed it.
Okay, other than that, it looks good. I mean, it's a project, it has functionalities and all that. Nice. Let's see if you have documentation as well. Yeah. Okay, yeah, I saw, like, you have other issues as well over there. For example, something with the... Okay, there's a lot of cleaning up to do here, so we'll do that. How was the... How did you... Did you fork what I created? Or did you?
So I didn't fork yours. I rebuilt from the start, and then wherever I was facing a problem, like this functionality and all, I was missing at all. So I was checking yours and giving that, you are, like, you blocked a React app as a screenshot to Cursor. And then Cursor was helping me to rectify it. Yeah, I'm not a front-end developer, right?
Okay.
So this is, like, totally different, for me.
So I refer it to a I for this kind of things, but. Yeah, like yeah, it helps, yeah.
Yeah, so. Okay, so we have all that, so maybe we'll start with the block, the actual block, and then we'll move to cleaning up the project to deal with it.
Okay. One thing that I wanted to mention is that if you can, just even just write for yourself, like maybe a bullet point or something, just so you remember the different features or things that we should put a spotlight on.
Okay. Anyway, so one thing that I wanted to clarify is that there's a lot of confusion regarding Bit. When you said the "red bread" that you started playing, it's not clear. Sometimes it even looks like Storybook. If you have used Storybook, it looks like you're just trying to render components individually or something like that. Sometimes it's just that it looks like, maybe, a substitute for it. People think a lot of things. We talk a lot about micro-frontends.
So, some people think that Bit is sort of like an alternative to module federation or other frameworks for micro-frontends, but that's a mistake. The idea with Bit is that the way we write code makes it really difficult for us to reuse code and to work in parallel and to distribute work between developers.
For example, one thing that I wanted to show here is why we even use the Entities component, like the doc metadata. So, let's say there's one person, one developer implementing the blog, and another person implementing the UI. The client wants the person who implemented the blog to create an entity component that has the mock data that has the interface for the entity. Let me show you from the public here, right?
Well, that's the type of data that I'm expected to get from the service, and I have mock data as well, and all that. That's already something that I'm getting from the person who is about to develop the service.
And now, in a way, we have a contract, right? Like, I mean, I can. I don't have to wait until this other person finishes working on his server and providing me with an API to use for the client. I can just start working with the Entity component.
I know exactly what it's going to have, how the data is going to be structured, and all that. So, I can just go to the blog, to the scope, and look for the Entity component, and I can install it in my project.
And now, I'm completely decoupled from this other person, the other developer who's working on the server. So, that's like an example, right? Like, I can have my own repository. I don't have to work in the same repository with him, and I can just use this component that he shared with me in my repository so that we're in sync even though we're not using the same repository, even though we're working on projects in PA.
Okay, so that's important because Bit helps you reuse code, and that's a big part of it. I mean, that's probably the major reason to use Bit - it really helps you reuse code because each code is its own component.
And we give you everything you need out of the box. You get a sort of gallery, right? Like Bit Cloud is like a really good gallery with a search. You can look for components, you can see the videos, you can see the documentation, you can see the API reference, and you can see everything.
So that's one thing that Bit is very good at - it helps you reuse code quickly and easily. You don't have to do a lot.
I mean, for example, let's say I have here... Let's take one example to do it. Okay, let's see. You have to-do items to do. I then have basic documentation, which is partly something that you create, partly generated by Bit. I have three views that I can see, and we're making it really easy to use the previews. You don't need Storybook on top of everything. All you have to do is just export a few examples, right?
And we give you API reference and so forth. And we give you the gallery so you don't have to deploy your own website to showcase a gallery for other developers to see, right?
So when we say we make it easy to share code, there is so much work involved in sharing code. It's not just getting it out as a package. You need to find a good place to document everything. You need a good place to preview. If it's UI, you have to show the API, like it does a lot more than just sharing code as packages.
So that part is clear, right? Like we really want to give you everything - it's a one-stop solution for everything, right? You get everything you need when you're using Bit to share code. That's clear, right?
Like this part. Okay, and so that's one thing. Another one related to sharing code: when you share code as packages, for example, each package has to have enough modules. Let's say I'm going here and...
Okay, let's go back to the to-do item. To-do item. Okay, so in addition to everything I just mentioned, when you share code, you have to... Let's say you want to share it with a package.
And you... Have you ever published a package, by the way? Did you get to experience that or...
Like on Python, or npm on IP, or npm, kind of like that kind of package publishing.
I can't hear you, something's wrong with the AIRC I can't hear you, something wrong with the connection with something or the audio or your mic.
Hello, can you hear me? Yeah, so I was asking like, publishing on npm or pip. What?
Yeah, okay, I can hear you now. What were you saying? Yeah.
Okay, yeah, I have published on pip and not npm, but pip. Yeah.
Okay, so usually, I mean, you have other tools that help you with that, but in general, you have to create a package.json for each package that you publish, right?
Yes.
And right, and then you have to specify the dependencies. You have to specify everything. Like, you have to do that manually. There are tools that help you with that, but you have to do it yourself. You have to make sure that there's a disk with the compliant code. All that you have to do, okay? B does it for you, right?
Like, it does it for you. It generates your package.json, it compiles your code, it creates your previews, it does all that for you. In addition to that, sometimes I mean, for example.
But if you look at your graph, let's say, pages to do page, and we can look at the graph. Okay, so think how complicated it is to do that yourself. Like, let's say I have a to-do page. And it's a package.
And it has a package.json. And the package.json has the different dependencies that it uses, but part of the dependencies are not external dependencies. They're not like, I don't know, React or anything like that. Part of them are other components that I use, right?
And it uses them, and that I maintain and build, and it has them as dependencies. So, whenever I change a version here, let's say I'm modifying the to-do list, for example. Then the to-do page needs to be modified. It needs to have a new package.json.
And the package.json now needs to use 0.7 instead of 0.6, for example. Right? So, all of that orchestration, all of that mess in making your code shareable as individual packages.
It's a lot. If you don't have an automation tool like Bit, it's just a lot. You have to take care of the packages, you have to take care of the dependencies, you have to take care of the previewing.
If I would just... I'll just say that as an example, and then we'll move forward. Let's say I just wanted to create this to-do app myself without Bit, right? And I want to enjoy PWA and all that.
And I want every package to be every component to be available in the package. I would have to create a repository with some tools from mono repos like Lerna or something like that helps me package different modules in my workspace. I would have to maintain everything. I would have to maintain the package.json. I would have to, maybe add Storybook to add some previews.
And it would take me a lot just to get started. And then I would have to, let's say I want to have this really good experience. When I have a gallery, I can go through different components, I can search for them. I would have to create it myself as well. I would have to create another website where I upload and document all my components.
It's just a lot. So the fact that it's so easy to share code and ensure that this code has shareholders, components, or packages, and that this code is easily discoverable by others with documentation, is a big plus.
That's a lot, and that's something that B does really well. That's the core of it - one thing. In addition to that, there's how maintainable your component or project is. I mean, if I go to your to-do app, for example, and I go to the graph.
I mean, what's better than this, right? I have an overview of your project. I know exactly what you're using. I can see that you have a portal provider. I can see that you have a page. I see that this page uses all these components. I can predict what would happen if I changed one of these components, right?
For example, if I change the to-do list, I know already that it's going to affect the to-do page, and I know that it's going to affect the DOA, right? So think how maintainable a project is when it's all components and clear graphs, and you have names, and if you're not even sure about what the component does, you can just click on that and see the documentation and the API reference.
So there are two things that B does really well. One, it really helps you share components or modules - however you want to define it, so people won't get confused. But it helps you share code in a very simple way.
It streamlines everything. It makes it so simple, so straightforward. It's a one-stop shop for all the different tooling you need in order to have a gallery with packages that you shared and documentation and all that.
And it takes care of the dependency management, and it does so many things. We don't have to go through everything that it does because there's a lot. I mean, anyone who has tried to publish a few packages knows that there's a lot to do with that.
So that's one thing that B does. Another thing that B does is make your code really maintainable, like really easy to understand, really easy to read through, really easy to debug. It's really easy to predict how changes are going to affect other changes and so forth.
So, that's another thing. Because BET understands the dependency structure, the dependency tree of your project, it knows which component chooses which component and so forth. So that's another thing that's really important.
And B does like code that looks that way, so it's just much easier to maintain and scale and so forth. Another thing that we always say, that's the third point. This is very easy, but it makes collaboration between non-technical team members, non-technical stakeholders, even more effective, and it sort of brings everyone closer to the collaboration process.
And why is that? Because let's say I'm a Product Manager or I'm a Designer and I don't have a good grasp of the technical side of things. I still can see. I mean, I can still go through here, for example, to do page and see, okay, how it looks like what's the version. I can see what it depends on. I can see who did that.
Like I don't have to can the report to my local machine, go through it, understand the structure. Like it's really easy for everyone to collaborate together. There's another blog, one that Yonna asked that, we write about and we talked about maybe we should talk to Emil and all that. I wrote it together with Emil the Designer here and we wrote a blog post for the blog there.
Is this bit PCE medium bitsation?
It is my experience as a Designer working for beta. So I'll send it to you. And that's a good resource, right? And the other resource is the actual.
Yeah. So, this bit pieces is like official bits publication.
Yeah, I mean, it started as the official one. Then we decided that we want to sort of like make it less efficient. Like talking about composable software in general.
So you see there's no bit logo here, right? You see, like the cover, everything, but in reality, I mean, people kind of connect the dots, they understand that bits and pieces is for beta, but still, we don't treat it as the official one.
Yeah, like, then, when I write the blog, I can share here only, from my medium account, so it will be nice. Yeah.
But I think it's better to use another blog because we already like you. You can see, everything is just bit. I mean, if you can, if you manage to have your blog published somewhere else, that would be much better.
Okay. Got it. Got it. Yeah.
So when I wrote with the Emil, the Designer, this blog post, that's exactly the thing that we talked about. And here. I mean, it's a really good blog post because it sort of like. Describes like, if you have like the blog post that I wrote about creating a React app and you have this blog post about working as a Designer.
I think it sort of like completes the picture because in the blog about React, they talk about the structure of the app, how it looks like when it's constructed using big components. And here it talks more about the process, how the development looks like.
Right. So, for example, we talk about breaking down the silo, right? Like, it's really easy to see what other team teams are doing, what everyone's doing, like, everything is very easy to understand, very easy to see, very easy to.
Yeah. So everything is just it's not like you have like different teams, you have no idea what they're working on and all that. No, it's really another thing that we do when we name our components. We give them names that are business oriented. We try not to be too technical, right?
So we won't say. Anyway, we try to use stuff that, everyone can understand and that align with our business objectives. Like this is the to do pages. So you won't call it like, a React to do? I don't know.
Like there are more technical and less technical ways to call things. We try to be as business. So sorry.
Yeah. Yeah, I understood.
Okay, then another thing, visualizing upon relationship that we talked about. Like, it's really easy for everyone to understand, even the Designer when a Designer, let's say the Designer decides that they're going to change a button, right?
Like, let's say this button is going to look a bit different. They can, using the tools that we have on Big Platform, they can see what's going to change, right? Like everything that is going to be affected by this change.
But that's a big thing. Yeah, you don't have to talk about it. Maybe you can just copy it from here if you want to, or some like here. But we have our own review process that allows you to see previews of separate components.
And it's sort of like the equivalent of a PU request only for Bit Cloud. Okay, so you can create a cloud and we call it a change request, and you can write comments and everything. Okay, let's see if there's anything else.
And we have our own CI, right? That builds every component separately. When it's done, if the build is successful, it looks for dependencies of this component and then it builds them. When it's done, it goes up, builds them and so forth.
That's it. Okay, so we talked about reusing components. We talked about the fact that your code is much more maintainable and scalable and readable. Easy to understand. And we talked about the fact that, because each component is independent, your teams can really work in parallel in small repositories, right? We don't need to have like one giant mono repo with all the code that we use because we want to share code and all that. Just imagine, like, let's say you're a company and you're onboarding a new employee, right?
And this employee needs to and I mean needs to learn so much in order to contribute and add features and all that. You can make the life much simpler. You can say. Okay. Let's say we need a contact us page.
Okay, you can just create a component, use this and that as dependencies. Let's say, I mean, you just tell them. I mean, you can try to use these components when you compose the page and that's it. Just send it.
I mean, so this developer now doesn't need to know anything about the entire company's codebase. They can just create one feature as a component and run Bit Tex spot and then they're done, right? So these are the basic things. Parallel development tech. More distributed development. Everyone can work separately in one place. We use code and bring everyone closer together, even non technical developers.
Yeah, these other things, I'll go back to this blog, so I talk about it here. I even finish the this part, okay, so I even write it here. So, let's see.
Six.
Okay, the one thing that confuses people, they might think, I mean, what now I have to create everything as a be usable component?
I mean, let's say. Let's say I'm creating a new page. Right, you created a page, let's go to your page test that to do page and let's see here. Okay, so I mean, you added a seven year earlier as a pop that's good, but you could I mean, just leave it without it. You can just, like, decide that this to dob always uses, cl your a or something like that.
Anyway, this to do page is reusable. But not like. Not like, really re. You know, like, it's not like I can just take this to the page and decided, I, let's see, the page, for example, I it doesn't give me, like, an API to change this or that or.
I mean, it's three years ago to a certain degree, right? You can change this, the source, but not everything. And that's something that really confuses people because they think like I'm not going to create every component as a generic component that everyone can use.
It's going to take me so much time to build everything. If I need a page, I just want that page. And I don't need a usable page. And that's perfectly fine. What we're saying with bit is sometimes you're going to have components that are not reusable.
I mean, they are reusable in the sense that you they can find them on bit cloud, they can install them, they can do that. But not all components are going, yeah, so not all components are going to be very reusableviously the simpler ones.
They can modify however they want.
Buttons. Let's say modern windows. All this stuff, like, I don't know, like different utility functions, like getting initials from a name, stuff like that. These are going to be like really reusable. They're going to be very generic.
That's obvious, but the more concrete and complex the component gets, it becomes less reusable. So it exists there, but it's less usable. So not every component is going to be reused by others. That's one thing.
But even if it's not going to be reused, it's still better to have it as a component because then it's part of this very elegant dependency graph with the components. Note. And another thing, sometimes you start a component. I wrote a blog about Itsch.
Sometimes you start a component as a very simple thing. Let's say here I'm part of the team working on the HR platform and we needed to create an employee card, right?
So we're not going to overcomplicate everything. We needed an employee card. An employee card needs to have an avatar, needs to have a name. It needs to have the employment status, and so forth.
So we create something very simple, right? Like we create a contract type, they can be full-time, part-time, that and that works for us. We now have a component that we can use, it works for us. That's it.
But then someone else can come along and say. Let's say. Let's see here. I don't have it. Just a second, okay? Someone else can come along and they. Yeah, they don't need an employee card. They need a customer card, right?
And but they see the employee card and they think like it's almost a good fit for them, but they need something a little bit different. So they can take this. They can take this employee card and import it to the worst case, change something, and then send a change request, the equivalent of a pull request to the team that maintained this.
And they can do something like making it. Make it more generic, more general, generalized so that it's not only an employee card, you can use it for other stuff. So in some cases, you're going to have really reusable components, things that be easy to understand why they're going to be reusable utility functions, UI elements like in UI library, all these stuff. In some cases you're going to have things that are not so reusable, and in some cases you're going to have things that are not so reusable, but someone finds them and needs to use them and so they can like, let's say, modify them just a little bit so that they're going to be a little bit more usable, that they can use them, right?
So you can like go over a component that used to be very concrete, very specific to the project that they were used for, and you can make them more usable as time goes. That's it. Okay. These are the yeah, the points that I wanted to make anything, any questions?
Okay, so let's say, yeah, if you had to describe Beats if you had like if you were asked like, okay, what are the competitors? What are the who competes with bit a tool like what competit what are the competitors for bit in terms of tooling and all that?
Yeah, so whoever is the company which is creating, which is providing, re component.
I think that connection is the connection.
Is there a problem with my mic?
I couldn't hear you again.
Can you hear me now?
Yeah.
Okay. So the company, which is. Which is providing the reusable components. The company which is providing creating an entire application in just a click or something. This can be the categories which closely compared with bit other than that, the company switch provides more of a, like, building the platform, without any hassle.
2.
So like open source kind of a company? Yeah.
Yes. Building a platform is more about how money and maybe hope, AI, but in general, there are many tools like Lerna and NX that try to make your code more maintainable and different parts of the code more reusable. We compete head-to-head with them. Lerna is no longer maintained by anyone, I think, but we still have NX and some other stuff.
No.
Yeah, that's basically it. And in a way, we don't say it yet, but in a way we compete with Git and GitHub and all that, because you don't have to use a repositor, you can just use git to create a compon.
Okay. Okay. So let's see what we have in your project and, the normoe.
There are a lot of VS Code extensions that we will never need if we use Bit like a package manager, and everything is directly in Bit, so we can directly create and publish, right?
Yeah, you don't need any tooling for publishing. You don't need tooling foration, you don't need tooling for almost anything, like you don't need the.
9.
Yeah, I mean, if you look at just a very simple example. Let's say we go to, let's say, a Design System.
Let's just pick one Design System as an example. Let's say this one, okay, it's got the components. Okay. So, for example, think about the things that they had to do. They had to, in order to show the load down component that they have and the drop down and all that, they actually created a website for it, right?
Like they had to create a website to show in a gallery all the components they had to use some tool, maybe NA, maybe NX, maybe something else to publish their packages and push them. They needed a CI solution, something to build the components. They needed a playground. They needed so many things in order to create that, to just present the components that they use. Let's say this one, for example.
Yeah, here is where, like, you have components. Let's see, buttons, right? All that they needed to create that like that someone actually worked on a website just to show it. So, yeah, okay, anyway, so we have that.
Okay, so one thing that I see here is you have a problem with Pololine. So we don't need a POC client. Let's remove it. But let me first create a brand.
Okay.
Okay. So first of all, we don't need that. I think you can just remove it so bit.
Apo looks like. Yeah.
Yeah, but you know what, let me just use the or maybe I can just add the beat extension here so we can.
So, I had one question, like, off topic of this, like, are you folks looking for any DevOps engineer to hire?
Okay. Yeah.
Okay. Like one of my friends was looking.
So that's why I.
Yeah, but unfortunately, it's, yeah, we're not hiring anyone even in the offices, but. Okay, so maybe I'll just try to use the extension maybe, because we can use the maybe a switch sometimes, I guess.
Yeah, I was trying to use that extension in Cursor, but it was not showing me anything inside components.
So I see that in Cursor I can go here and then I see it.
Yeah. So in my system, it was not showing that inside.
Yeah. Okay.
Component list in.
You have to say. Maybe. Maybe because you need the project to be, you need the bit map, to be, in the root directory of your project. So.
Okay.
Okay.
Because I have a, like project, like workspace is a different. And inside that, there is a bit. Work. Space. Different.
Yeah, that's the problem. That's the problem. It needs to be like directly one workspace and that's the entire project.
Okay, so I can go to Big to make it simpler. And. Okay, I can see. So already I can see all the components that you have with the icons and everything. So we have the Apollo client, we don't need that. I can click on remove.
But that would only remove it from the workspace. That's not something that I want to delete.
Okay.
Delete. Okay, I can, I mean, click, I can delete or I can deprecate again, but let's delete it. We don't need it, so delete I show. Yes.
Okay, so now we don't have that. Now we have to do API to enhance. We have to do item and enhance to do lists and enhanced. What are you actually using? Are you using the enhanced to-do item?
Uhced one.
Okay, you're using this one, right?
Okay, so let me remove this one. I'll delete this one, the to-do item delete. Yes. Okay, and now let's rename this one.
Yeah.
So you have to clean everything.
It doesn't give me an option to rename. Let's see, we have the you do like it name no, the Brickades. Okay, anyway, I'll just use the CLI. So I want to rename the to-do one.
So bitname at any point, I keep saying, like you can just add a dash page and see what you can do with this command. Because, I mean, yeah, I never remember, like everything.
Current. Name?
So name now I need to pass the current name.
Name? Yeahed.
The current name is enhanced to-do item down here and copy. This is the idea. I can copy it here, but I don't want the one. I just keep it at me. I don't have to specify the entire ID. You just need the name.
Okay, so bit we name you your instance to-do it. I want to be name UI to-do writing.
Okay, what I definitely shouldn't do is just go to the directory and change the name here, right? That's not something I should do. And why is that? Because Big Map needs to be updated accordingly.
So. So I'll show you what's happening now. We renamed UI enhanced to enhance to-do I 10 and we name it to us so we renamed UI and as to-do item to-do it.
Blu. Item.
Okay, yeah, so let's see, have you to-do I 10 it actually created.
Okay, it changed the name here, and it changed the folder name accordingly.
Nice.
And what did it do with the other component? Okay. There it is. And you can see. I don't really have to use the bit web file. I'm just showing it because maybe it's clearer to understand what it did for us. It created the folder, renamed it, created a new mapping, and added configuration to the previous component to do it. And then it removed the previous component. So when you rename a component, you actually create a new component and configure the previous name and previous component as the leader.
That's what you do when you... Okay, so we did that, now we have a new component. What else do we have to change? Let's see, but we have the enhanced to-do list. Okay, so let's change that as well. Enhance to-do list to UI to-do list.
Yeah.
And that you alreadyed the list, so.
So that to-do list is the previous one, only the list.
You are e to list, so. Okay, so it can't do what you wanted. It can just. It can't, set the previous.
So a basic one and an enhanced one is the main one we are using. Yeah.
I'm just saying like the reason why it wasn't able to rename it is because in order to rename it needs this folder to be... It needs to be able to create a new folder for the new component with that name to do this. And it already exists, right?
He.
So I think in this case, the easiest thing would be to just take... So you're saying it's not like you're enhancing, you're not like extending the to-do list. You have a new to-do list, right? It's completely new, right? It only uses the to-do item. Okay. Okay. So I think the easiest thing here would be to just take all that, copy it, copy that, and put it in the to-do list instead of that. So let me delete all that.
So the thing is, like, so the to-do list is actually used in our system. So if you go to graphs, you will see two pages have a, two dependents. One is a to-do list and then an enhanced studio list. Enhanced studio list focuses on the enhanced studio item. And, to-do list uses the hook as a used to-do to, for the to-do item. But the to-do item is not used currently, so I guess renaming the to-do list will be the problem. I'm not sure. Can you check the graph in BET cloud once?
So okay, I was shock that it's not being used to do list it is being used by the to do vage. So what? So which? So why do you and what use of the enhanced to go list?
And the to-do list is for those two items on the entire page, which you are seeing on page two. So this confusion happened because I have two types of to-do pages. Previously, it was a simple one.
So I wanted to make it nicer, and that's created a problem, I guess.
I mean, it's more work. Just let's decide that we remove the enhanced to-do list, we delete it. We only have the to-do list and just make sure that the to-do list provides all the things that you need in order to. It shouldn't be both to-do list and enhanced to-do list.
It's really confusing. It's okay.
So it's not only renaming, it's actually changing the code and all that. Maybe I shouldn't, you know what, maybe I shouldn't do it because it's too much. Would you? Yes. Okay, and. Okay, so this part you have to do yourself.
Okay, I can, what I'll do for now is I can duplicate the enhanced to-do list.
Okay, no worries. I will do it. So, you can ignore it for now. I will do it. Yeah.
Okay, but still, just to make it simpler for you, I'll just duplicate the enhanced point. It means that it would still be there, but it's not going to be delivered, and it's not going to show up in the scope.
And once you use the to-do list only and not the enhanced one, then you don't have to do anything else other than that, so I'll just do that here and. Okay. Option on new ID. Is that okay? Okay. Okay.
And. It's. Get.
I don't have access to your wile. I guess.
01.
Yours is git a done, right?
The air. Get. Yeah.
Yeah. Now you can do it. I sent the invite.
I get it. Okay. But where is it? So, okay, so that's it. So just to clean up the color a little bit. So we talked about that having just a to-do list, not an enhanced one, and having a mock option so that everything renders in the previews in the scope.
And that's it, I think, just making sure that everything looks nice. Yeah, because in the future, you'll probably use the same scope for everything, right? For other articles as well.
Yeah. Yeah, I think that's it. Yeah, okay, and if you, I mean, you can work in parallel on the blog, if you already have a draft, you can send it to me too. Yeah, okay, great.
Okay, guess so. Yeah, Jo.
Okay. So we'll talk by. For. Bye. Bye.
