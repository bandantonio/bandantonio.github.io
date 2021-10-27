---
title: Pelican Custom Page Using Jinja2
date: 2017-11-04 23:00
tags:
- pelican
- jinja2
- template
---

![Pelican Custom Page Using Jinja2](/images/2017/11/custom-page-jinja2-title.png)

Hi everyone!

Today I want to tell you how to create your own custom page in [Pelican](./pelican-on-gitlab-pages.md) using Jinja2 templating language.

## Introduction

In my case, the goal behind this idea was to create a resume/cv page based on a custom template that I didn't want to include as a part of the main theme. I wanted to have a separate page that somehow resembles that in Linkedin, but with extended information about my knowledge, skills, and portfolio. At the same time, I thought on the reduction of excessive and not quite relevant information about my working experience from the Linkedin page. In fact, the whole creation and transformation process turned out to be simpler than I thought at first.

## Create a New Page

First of all, create a new page called `cv.md` with the following contents:

```yaml
Title: CV Mister Gold
Date: 2017-10-31 00:01
Author: antonio
Slug: cv-mister-gold
Summary: My CV
Status: hidden
Template: cv-template
url: cv/mister-gold
Save_as: cv/mister-gold.html
```

This page contains default metadata with some additional attributes: `template`, `url` and `save_as`.

The first one defines a template that will be used to generate this particular page (the details on how to create a template are covered below). The second one is used to define a URL to access this page. The third one points where the generated page will be saved. The latter two parameters are similar to `PAGE_URL` and `PAGE_SAVE_AS` parameters in `pelicanconf.py`.

## Create a New Base Template

This is an optional step. Base template is responsible for all "shared" elements located outside the current page (e.g. header, footer, common blocks in the sidebar, etc). As my blog has a non-default theme, a new base template was required to get rid of navigation links (where some contact details and download buttons can be added later). If you don't need to customize the basic structure of the resume page, you can skip this step. However, if there are some modifications required or you want to change some blocks, the steps below will be similar.

Create a file called `cv-base.html`. It will inherit the code from the `base.html` file except for header links (navigation). My code looks as follows (only changed part is shown):

```html
<!DOCTYPE html>
<html lang="en-US">
    <head>
    <link rel="stylesheet" type="text/css" href="{{ SITEURL }}/theme/css/cv.css" />
    </head>
    <body>
        <div id="content-sans-footer">
        <div class="navbar navbar-static-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="{{ SITEURL }}/"><span class=site-name>{{ SITENAME }}</span></a>
                    <div class="nav-collapse collapse">
                        <ul class="nav pull-right top-menu">
                            <li><a href="#">Download My CV</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span1"></div>
                <div class="span10">
                    {% block content %}
                    {% endblock content %}
                </div>
                <div class="span1"></div>
            </div>
        </div>
        <div id="push"></div>
    </div>
    </body>
</html>
```

All the navigation links were previously located under the `nav pull-right top-menu` class, so I deleted them. The interesting part here is content located in `{% ... %}` blocks. This is where Jinja2 does its magic - outputs contents of a template for the cv page. I will create this template later, as well as the `cv.css` stylesheet file, defined in the head section.

## Create a New Template

We created a page earlier, but it refers to a non-existing (yet) template. So, let's fix it. Create a file called `cv-template.html`. This file defines how the cv page will look like and what elements will be visible for visitors.

```jinja
{% extends 'cv-base.html' %}

{% block title %}
{{ page.title|striptags|e }} {%if page.subtitle %} - {{ page.subtitle|striptags|e }} {% endif %} · {{ super() }}
{% endblock title %}

{% block head_description %}
{% if page.summary %}
{{ page.summary|striptags|e }}
{% endif %}
{% endblock head_description %}

{% block meta_tags_in_head %}
{{ super() }}
{% if page.keywords %}
<meta name="keywords" content="{{ page.keywords }}" />
{% endif %}

{% from '_includes/smo_metadata.html' import smo_metadata with context %}
{{ smo_metadata(page) }}
{% endblock meta_tags_in_head %}

{% block content %}
<p>HTML Resume Template</p>
{% endblock content %}
```

This file starts with the `{% extends 'cv-base.html' %}` line that indicates that the current template will act as a child for `cv-base.html` (in other words, cv-template extends the cv-base template), so here we can define only blocks that should be overwritten. Actually, there is only one: `content`. Other four blocks just contain metadata and required information to be included in the `<head>` section. You may have noticed that `smo_metadata.html` is imported using `from` construction - that's because it is located in a separate file. The `{{ super() }}` block is used to display the contents of the parent block.

To shorten the template I deliberately hardcoded one paragraph `<p>HTML Resume Template</p>` in the content block. I will replace it by the HTML template and modify with a bit of Jinja2 code later.

So, at this point, you should have 3 template files and one new page. Let's test how everything works together. Build pelican content and then navigate to the address that you specified in the `cv.md` file under the `url` parameter. In my case, it was `http://localhost:8000/cv/mister-gold`. NOTE: This page was created for demonstration purposes. The real page is still under development and will be available later.

If everything was done right with the templating, you should see something like this:

![Blank CV Template](/images/2017/11/blank-cv-template.png "Blank CV Template")

Great! Everything is OK, so we keep going.

### Add basic information

Create a file called `cv.html` and place it somewhere in your theme's directory. This file will be used to store the main resume information, like your working experience, skills, portfolio, etc.

Start with something simple:

```jinja
{% if not CV_DATA %}
{% set CV_DATA = {
    'photo':    'http://via.placeholder.com/200x300',
    'name':     'John Doe',
    'headline': 'Strong headline to impress everyone who reads it',
    'summary':  'Sumary of what you are strong in',
    'email':    'email@example.com',
    'website':  'https://example.com',
    'phone':    '123-456-789-0',
    'linkedin': '#'
}
%}
{% endif %}
```

This block indicates that if the CV_DATA parameter is used somewhere in templates but was not defined in `pelicanconf.py` file, the default set of values will be used for this parameter. You can then access these values by passing `CV_DATA.parameter` in the template.

Why should you add the information that way? The only reason is that you can easily reuse it later. Imagine you add some information about your skills directly in the template in several places. Later on, you decided to change these skills and add new ones. But to do this, you should search across these places again and modify all the occurrences of the text. This is a time-consuming and boring activity.

Instead, having a file containing all the information is a step forward, as the only thing you need to do in the template is to write several lines of Jinja2 code to include the necessary section. After that this section will be always up-to-date with the changes you make in the `cv.html` file, no matter how scattered the places with skills section are.

Okay, we added the information, let's show it in the cv page.

Open the `cv-template.html` file and replace the dummy paragraph within the content block with the following code:

```html
<div id="main">
{% from '_includes/cv.html' import CV_DATA with context %}
    <div id="photo">
        <img src="{{ CV_DATA.photo }}" alt="" />
    </div>
    <div class="header photo">
        <h1 id="title">Hi, my name is {{ CV_DATA.name }}</h1><small>{{ CV_DATA.headline }}</small>
        <ul class="r">
            <li class="email">E-mail:</span> <span class="value">{{ CV_DATA.email }}</span></li>
            <li class="website">Website:</span> <span class="value"><a href="{{ CV_DATA.website }}">{{ CV_DATA.website }}</a></span></li>
            <li class="phone">Phone:</span> <span class="value">{{ CV_DATA.phone }}</span></li>
            <li class="linkedin">Linkedin:</span> <span class="value"><a href="{{ CV_DATA.linkedin }}">Linkedin</a></span></li>
        </ul>
    </div>
</div>
```

The first Jinja2 line here indicates that we want to import the `CV_DATA` section from the `cv_html` file and after that, we just pull values of parameters that `CV_DATA` section contains. HTML code is a wrapper to organize the output within an unordered list.

Save all the changes, build Pelican files and check how the cv page looks now:

![Basic Info](/images/2017/11/basic-info-cv-template.png "Basic Info CV Template")

### Add Working Experience

To add information about your working experience we can use similar code blocks as described above with minor improvements: cycles and if-else statements. First of all, add the corresponding section to the data file:

```
{% if not CV_WORK %}
{% set CV_WORK = [{
    'company': 'Apple',
    'url': 'https://www.apple.com/',
    'project': 'iPhone',
    'position': 'Mobile Developer',
    'description': 'Lorem Ipsum',
    'from': '2015',
    'till': 'Present'
},{
    'company': 'Google',
    'url': 'https://www.google.com/',
    'position': 'Developer',
    'description': 'Lorem Ipsum',
    'from': '2013',
    'till': '2015'
}]
%}
```

and update the `cv-template.html` respectively:

```html
<div class="section section-work">
    <h2 class="title">Work experience</h2>
    <div class="set">
        {% from '_includes/cv.html' import CV_WORK with context %}
        {% for workplace in CV_WORK %}
        <div class="item">
            <h3><span class="company l"><a href="{{ workplace.url }}" title="{{ workplace.company }}">{{ workplace.company }}</a></span>
                <span class="date r">{{ workplace.from }} - {{ workplace.till }}</span>
            </h3>
            <div class="clear"> </div>
            {% if workplace.project %}
            <span class="job_title">{{ workplace.position }}</span><span class="project">Project: {{ workplace.project }}</span><div class="info">{{ workplace.description }}
            </div>
            {% else %}
            <span class="job_title">{{ workplace.position }}</span><div class="info">{{ workplace.description }}</div>
            {% endif %}
            <div class="clear"> </div>
        </div>
        {% endfor %}
    </div>
</div>
```

To display several entries this section uses cycle construction `{% for workplace in CV_WORK %}` and the appropriate value references `workplace.value`. Basically, the syntax for the cycle is the same as in most programming languages. This section also has a conditional statement `{% if workplace.project %}-{% else %}` that displays additional details about a working project (if any).

Check the updated cv page again:

![Two Workplaces](/images/2017/11/cv-two-workplaces.png "Two Workplaces")

Great, it works again! Note that the defined `if-else` statement works as it displays the project for Apple job. To get a bit more familiar with the code you can add real data and new sections and then reorder them.

### Add Education, Skills, Portfolio, Testimonials

All these sections can be added using cycle construction with the similar HTML structure. However, if you have only one item cycles can be redundant and it is better to use direct template references using `{{ parameter.value }}` to simplify the final code.

### Add Styling

Once all basic sections completed, you can add visual styling. Create a file named `cv.css` and place it under the css folder of theme directory. As a quick start tip, you can use any HTML resume template styling that is available across the Internet and then make necessary customizations. My file looks as follows:

```css
body{background:#f0f0f0;margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial;line-height:18px;font-size:12px;color:#222}
h1,h2,h3,h4{margin:0 0 15px 0;padding:0}
h1{font-size:300%}
h2{font-size:210%}
h3{font-size:130%}
p{margin:0 0 10px 0}
ul{margin:0;padding:0 0 0 10px;list-style-type:square}
a{color:#222}
.clear{clear:both}
#main{background:#fff;width:900px;padding:35px;margin:0 auto 15px auto;overflow:hidden;box-shadow:0 0 6px #ccc}
#title{line-height:42px;border-bottom:3px solid #000;padding-bottom:30px;margin:0 0 30px 0;font-weight:bold}
.item{margin:0 0 20px 0}
.section .title{background:#000;float:left;text-transform:uppercase;font-size:102%;font-weight:bold;word-wrap:break-word;color:#fff;padding:4px 6px;width:16%;margin-right:30px}
.section .set{float:left;width:78%}
.section .set h3{margin:0}
.section span.value{display:block}
.section h3 span.l,.section span.r{width:49%;float:left}
.section span.r{float:right;text-align:right}
.section-work .job_title{font-size:100%;display:block;margin:5px 0 5px 0}
#photo{width:160px;height:200px;overflow:hidden;float:left;margin-top:8px;border-radius:4px}
#photo img{width:100%;height:auto}
.header.photo{margin-left:190px}
.header.photo #title{text-align:left}
.header.photo .basic-info{float:none;padding:0}
@media screen and (max-width:950px){body{background:#fff}
#main{box-shadow:none;padding:0;padding:5px}}
```

The resulting CV page:

![Ready CV Page](/images/2017/11/ready-cv-page.png "Ready CV Page")

And... That's all! After completing all sections you may end up with something similar:

![Completed Final CV Page](/images/2017/11/final-cv-resume-page.png "Completed Final CV Page")

Below in the example of the final CV page:

<details> 
  <summary>folder structure</summary>
```bash
.
├── content
│   └── pages
│       └── cv.md
└── theme
    └── theme-name
        ├── static
        │   └── css
        │       └── cv.css
        └── templates
            ├── _includes
            │   └── cv.html
            ├── cv-base.html
            └── cv-template.html
```
</details>

<details> 
  <summary>cv.md</summary>
   
  ```yaml
  Title: CV Mister Gold
  Date: 2017-10-31 00:01
  Author: antonio
  Slug: cv-mister-gold
  Summary: My CV
  Status: hidden
  Template: cv-template
  url: cv/mister-gold
  Save_as: cv/mister-gold.html
  ```
</details>

<details> 
  <summary>cv.css</summary>
   
  ```css
  body{background:#f0f0f0;margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial;line-height:18px;font-size:12px;color:#222}
  h1,h2,h3,h4{margin:0 0 15px;padding:0}
  h1{font-size:300%}
  h2{font-size:210%}
  h3{font-size:130%}
  p{margin:0 0 10px}
  ul{margin:0;padding:0 0 0 10px;list-style-type:square}
  a{color:#222}
  .clear{clear:both}
  #main{background:#fff;width:900px;padding:35px;margin:0 auto 15px;overflow:hidden;box-shadow:0 0 6px #ccc}
  #title{line-height:42px;border-bottom:3px solid #000;padding-bottom:30px;margin:0 0 30px;font-weight:700}
  #credit{margin-bottom:20px;font-size:11px;color:#999;text-align:center}
  #credit a{color:#999}
  p label{font-weight:700;font-size:110%;margin-right:10px}
  p label span.colon{display:inline}
  .section{margin-bottom:20px}
  .item{margin:0 0 20px}
  .rtl{direction:rtl}
  .photo .basic-info .set{float:none!important;width:auto!important}
  .basic-info .address{width:40%;float:left}
  .basic-info .r{float:right;width:58%;text-align:right}
  .basic-info label{font-weight:700}
  .basic-info label,.basic-info span{display:inline!important}
  .basic-info p{margin:0}
  .section .title{background:#000;float:left;text-transform:uppercase;font-size:104%;word-wrap:break-word;color:#fff;padding:4px 6px;width:17%;margin-right:30px}
  .section .set{float:left;width:78%}
  .section .set h3{margin:0}
  .section span.value{display:block}
  .section h3 span.l,.section span.r{width:49%;float:left}
  .section span.r{float:right;text-align:right}
  .section-portfolio .portfolio-item {display:inline-block;margin:5px;text-align:center;}
  .section-education .school, .section-work .job_title{font-size:100%;display:block;margin:5px 0}
  #photo{width:160px;height:200px;overflow:hidden;float:left;margin-top:8px;border-radius:4px}
  #photo img{width:100%;height:auto}
  .header.photo{margin-left:190px}
  .header.photo #title{text-align:left}
  .header.photo .basic-info{float:none;padding:0}
  @media screen and (max-width: 950px){
  body{background:#fff}
  #main{box-shadow:none;padding:0;padding:5px}}
  ```
</details>

<details> 
  <summary>cv.html</summary>
   
  ```jinja
  {% if not CV_DATA %}
  {% set CV_DATA = {
      'photo':    'http://via.placeholder.com/200x300',
      'name':     'John Doe',
      'headline': 'Strong headline to impress everyone who reads it',
      'summary': 'Sumary of what you are strong in',
      'email':    'email@example.com',
      'website':  'https://example.com',
      'phone':    '123-456-789-0',
      'linkedin': '#'
  }
  %}
  {% endif %}  

  {% if not CV_SKILLS %}
  {% set CV_SKILLS = [{
      '00': 'Donec porttitor dictum tristique. Suspendisse vehicula, nibh vel consequat lacinia',
      '01': 'lorem mauris egestas massa, et facilisis ipsum erat in magna',
      '02': 'Morbi vestibulum ligula vel felis pulvinar, id auctor sapien rutrum',
      '03': 'Etiam quis scelerisque metus, et imperdiet leo',
      '04': 'Aenean condimentum quis massa et mattis',
      '05': 'Donec sed vulputate erat, ac scelerisque nuncю Quisque aliquet condimentum ex, et lacinia massa porttitor nec'
  }]
  %}
  {% endif %}

  {% if not CV_WORK %}
  {% set CV_WORK = [{
      'company': 'Apple',
      'url': 'https://www.apple.com/',
      'project': 'iPhone',
      'position': 'Mobile Developer',
      'description': 'Vestibulum varius lacus et nisi dictum iaculis. Proin faucibus ut risus ac sagittis. Cras rutrum condimentum laoreet. Aliquam ac erat nec justo scelerisque sodales. Fusce sed ex tempor, tempor turpis quis, luctus lectus. Aenean in lobortis dolor. Nullam tristique vel velit ut facilisis. Sed nec scelerisque nisl. Sed eu faucibus tellus. Nulla quis sollicitudin enim. Vivamus pharetra auctor convallis. Morbi quis semper turpis.',
      'from': '2015',
      'till': 'Present'
  },{
      'company': 'Google',
      'url': 'https://www.google.com/',
      'position': 'Developer',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin leo sem, sagittis eu nisl et, feugiat interdum ex. Fusce tempus velit sit amet vehicula porta. Proin accumsan feugiat sagittis. Pellentesque laoreet auctor viverra. Sed feugiat metus quis ligula gravida rhoncus. Praesent in lectus venenatis, ullamcorper nunc vitae, venenatis diam. Vestibulum semper finibus sapien, vel convallis leo varius non.',
      'from': '2013',
      'till': '2015'
  }]
  %}
  {% endif %}

  {% if not CV_TESTIMONIALS %}
  {% set CV_TESTIMONIALS = [{
      'name': 'Joe Doe',
      'linked_company': 'Google',
      'date': 'April 25, 2014',
      'text': 'Etiam eget bibendum mauris. Ut pretium lorem ac ligula vestibulum porta. Proin dapibus aliquam dictum. In nec tellus enim. Morbi pharetra nisi tortor, sit amet pretium odio vulputate et. Cras ac nunc ipsum. Nunc ornare commodo luctus. Nunc nec eleifend neque. Integer eget neque faucibus, blandit velit eu, ultricies sapien. Fusce eget vestibulum ante, et imperdiet tortor. Sed in libero maximus, placerat lectus id, finibus massa. Sed egestas ligula a augue tincidunt cursus. Proin eleifend nec ante sed eleifend.'
  },{
      'name': 'Steve Wozniak',
      'linked_company': 'Apple',
      'date': 'November 2016',
      'text': 'Etiam eget bibendum mauris. Ut pretium lorem ac ligula vestibulum porta. Proin dapibus aliquam dictum. In nec tellus enim. Morbi pharetra nisi tortor, sit amet pretium odio vulputate et. Cras ac nunc ipsum. Nunc ornare commodo luctus. Nunc nec eleifend neque. Integer eget neque faucibus, blandit velit eu, ultricies sapien. Fusce eget vestibulum ante, et imperdiet tortor. Sed in libero maximus, placerat lectus id, finibus massa. Sed egestas ligula a augue tincidunt cursus. Proin eleifend nec ante sed eleifend.'
  }]
  %}
  {% endif %}

  {% if not CV_PORTFOLIO %}
  {% set CV_PORTFOLIO = [{
      'item': 'item #1',
      'description': 'Nam tempus elementum semper.',
      'image': '<a href="#"><img src="http://via.placeholder.com/100x100"></a>'
  },{
      'item': 'item #1',
      'description': 'Nam tempus elementum semper.',
      'image': '<a href="#"><img src="http://via.placeholder.com/100x100"></a>'
  },{
      'item': 'item #1',
      'description': 'Nam tempus elementum semper.',
      'image': '<a href="#"><img src="http://via.placeholder.com/100x100"></a>'
  }]
  %}
  {% endif %}

  {% if not CV_EDUCATION %}
  {% set CV_EDUCATION = [{
      'university': 'Harvard',
      'faculty': '',
      'major': '',
      'qualification': '',
      'degree': '',
      'from': '2009',
      'till': '2013'
  }]
  %}
  {% endif %}
  ```
</details>

<details> 
  <summary>cv-base.html</summary>
   
  ```html
  <!DOCTYPE html>
  <html lang="en-US">
  <head>
    <meta charset="utf-8"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    {% if page and page.author %}
    <meta name="author" content="{{ page.author }}" />
    <meta name="copyright" content="{{ page.author }}" />
    {% else %}
    <meta name="author" content="{{ AUTHOR }}" />
    <meta name="copyright" content="{{ AUTHOR }}" />
    {% endif %}
    {% if page %}
    <link rel="canonical" href="{{ SITEURL }}/{{ page.url }}" />
    {% endif %}
    {% from '_includes/_defaults.html' import SITE_DESCRIPTION with context %}
    {% if SITE_DESCRIPTION %}
    <meta name="description" content="{% block head_description %}{{ SITE_DESCRIPTION|e }}{% endblock head_description %}" />
    {% endif %}
    {% if GOOGLE_VERIFICATION %}
    <meta name="google-site-verification" content="{{ GOOGLE_VERIFICATION }}" />
    {% endif %}
    {% if YANDEX_VERIFICATION %}
    <meta name="yandex-verification" content="{{ YANDEX_VERIFICATION }}" />
    {% endif %}
    
    {% block meta_tags_in_head %}
    {% from '_includes/_defaults.html' import GOOGLE_PLUS_PROFILE_URL with context %}
    {% if GOOGLE_PLUS_PROFILE_URL %}
    <link rel="author" href={{GOOGLE_PLUS_PROFILE_URL}} />
    {% endif %}
    {% from '_includes/_defaults.html' import TWITTER_USERNAME with context %}
    {%if TWITTER_USERNAME %}
    <meta name="twitter:creator" content="@{{TWITTER_USERNAME}}">
    {% endif %}
    <meta name="twitter:card" content="summary">
    {% endblock meta_tags_in_head %}
    
    <title>{% block title %}{{ SITENAME|striptags|e }}{% endblock title %}</title>
    {% block head_links %}
    <link rel="stylesheet" type="text/css" href="{{ SITEURL }}/theme/css/cv.css" />
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" media="none" onload="if(media!='all')media='all'">
    <noscript>
      <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css">
    </noscript>
    {% if 'assets' in PLUGINS %}
    {% include '_includes/minify_css.html' with context %}
    {% else %}
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/mister-gold-cdn@2.1.2/elegant.css" media="none" onload="if(media!='screen')media='screen'">
    <link rel="stylesheet" type="text/css" href="{{ SITEURL }}/theme/css/custom.css" media="none" onload="if(media!='screen')media='screen'">
    <noscript>
      <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/mister-gold-cdn@2.1.2/elegant.css" media="screen">
      <link rel="stylesheet" type="text/css" href="{{ SITEURL }}/theme/css/custom.css" media="screen">
    </noscript>
    {% endif %}
    {% endblock head_links %}
    {% include '_includes/favicon_links.html' %}
    {% include '_includes/analytics.html' %}
  </head>
  <body>
    <div id="content-sans-footer">
      <div class="navbar navbar-static-top">
        <div class="navbar-inner">
          <div class="container-fluid">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
            <a class="brand" href="{{ SITEURL }}/"><span class=site-name>{{ SITENAME }}</span></a>
            <div class="nav-collapse collapse">
              <ul class="nav pull-right top-menu">
                <li><a href="#">Download My CV</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row-fluid">
          <div class="span1"></div>
          <div class="span10">
            {% block content %}
            {% endblock content %}
          </div>
          <div class="span1"></div>
        </div>
      </div>
      <div id="push"></div>
    </div>
    {% block script %}
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
    <script>
      function validateForm(query)
      {
        return (query.length > 0);
      }
    </script>
    {% endblock script %}
    </body>
  </html>
  ```
</details>

<details> 
  <summary>cv-template.html</summary>
   
  ```html
  {% extends 'cv-base.html' %}

  {% block title %}
  {{ page.title|striptags|e }} {%if page.subtitle %} - {{ page.subtitle|striptags|e }} {% endif %} · {{ super() }}
  {% endblock title %}

  {% block head_description %}
  {% if page.summary %}
  {{ page.summary|striptags|e }}
  {% endif %}
  {% endblock head_description %}

  {% block meta_tags_in_head %}
  {{ super() }}
  {% if page.keywords %}
  <meta name="keywords" content="{{ page.keywords }}" />
  {% endif %}

  {% from '_includes/smo_metadata.html' import smo_metadata with context %}
  {{ smo_metadata(page) }}
  {% endblock meta_tags_in_head %}

  {% block content %}
  <div id="main">
    {% from '_includes/cv.html' import CV_DATA with context %}
    <div id="photo">
      <img src="{{ CV_DATA.photo }}" alt="" />
    </div>
    <div class="header photo">
      {% from '_includes/cv.html' import CV_DATA with context %}
      <h1 id="title">Hi, my name is {{ CV_DATA.name }}</h1><small>{{ CV_DATA.headline }}</small>
      <ul class="r">
        <li class="email">E-mail:</span> <span class="value">{{ CV_DATA.email }}</span></li>
        <li class="website">Website:</span> <span class="value"><a href="{{ CV_DATA.website }}">{{ CV_DATA.website }}</a></span></li>                        
        <li class="phone">Phone:</span> <span class="value">{{ CV_DATA.phone }}</span></li>
        <li class="linkedin">Linkedin:</span> <span class="value"><a href="{{ CV_DATA.linkedin }}">Linkedin</a></span></li>
      </ul>
    </div><div class="clear"> </div>
    <div class="section section-1369309524934">
      <div class="basic-info section">
        <h2 class="title">Summary</h2>
        <div class="set"><p class="address"><span class="value">{{ CV_DATA.summary }}</span></p>
          <div class="clear"> </div>
        </div><!-- set //-->
        <div class="clear"> </div>
      </div><!-- basic-info //-->
      <div class="clear"> </div>
    </div>
    <div class="section section-work">
      <h2 class="title">Work experience</h2>
      <div class="set">
        {% from '_includes/cv.html' import CV_WORK with context %}
        {% for workplace in CV_WORK %}
        <div class="item">
          <h3><span class="company l"><a href="{{ workplace.url }}" title="{{ workplace.company }}">{{ workplace.company }}</a></span>
            <span class="date r">{{ workplace.from }} - {{ workplace.till }}</span>
          </h3>
          <div class="clear"> </div>
          {% if workplace.project %}
          <span class="job_title">{{ workplace.position }}</span><span class="project">Project: {{ workplace.project }}</span><div class="info">{{ workplace.description }}</div>
          {% else %}
          <span class="job_title">{{ workplace.position }}</span><div class="info">{{ workplace.description }}</div>
          {% endif %}
          <div class="clear"> </div>
        </div>
        {% endfor %}
      </div>
    </div>
    <div class="section section-recommendations">
      <h2 class="title">Recommendations</h2>
      <div class="set">
        {% from '_includes/cv.html' import CV_TESTIMONIALS with context %}
        {% for testimony in CV_TESTIMONIALS %}
        <div class="item">
          <span class="name">{{ testimony.name }}</span>
          <span class="company">{{ testimony.position }}</span>
          <span class="relation">{{ testimony.relation }}</span>
          <p class="linked_company">{{ testimony.linked_company }}, <span class="date">{{ testimony.date }}</span></p>
          <p class="text">{{ testimony.text }}</p>
        </div>
        {% endfor %}
      </div>
    </div>
    <div class="section section-portfolio">
      <h2 class="title">Portfolio</h2>
      {% from '_includes/cv.html' import CV_PORTFOLIO with context %}
      {% for project in CV_PORTFOLIO %}
      <div class="portfolio-item">
        <p class="project">{{ project.item }}</p>
        <span class="person">{{ project.image }}</span>
        <p class="text">{{ project.description }}</p>
      </div>
      {% endfor %}
    </div>
    <div class="section section-qualifications">
      <h2 class="title">Skills</h2>
      <div class="set">
        <div class="item">
          <span class="info">
            {% from '_includes/cv.html' import CV_SKILLS with context %}
            {% for skills in CV_SKILLS %}
            {% for num in skills %}
            <ul>
              <li>{{ skills[num] }}</li>
            </ul>
            {% endfor %}
            {% endfor %}
          </span>
        </div>
      </div>
    </div>
    
    <div class="section section-education">
      <h2 class="title">Education</h2>
      <div class="set">
        <div class="item">
          {% from '_includes/cv.html' import CV_EDUCATION with context %}
          {% for schools in CV_EDUCATION %}
          <h3><span class="course l">{{ schools.university }}</span>
            <span class="date r">{{ schools.from }} - {{ schools.till }}</span>
          </h3>
          <div class="clear"> </div>
          {% endfor %}
        </div>
      </div>
      <div class="clear"> </div>
    </div>
    
  </div>
  <div id="credit">Made by <a href="https://mister-gold.pro">Mister Gold</a></div>
  {% endblock content %}
  ```
</details>

<br />

## Final Thoughts

As I mentioned at the beginning of this article, creating a page using Jinja2 templating only seems to be hard. As my experiment showed, the page structure can be designed in just a couple of hours. The current approach lacks some style and elegance, however, this was my first experience with Jinja2 based on real-world needs. I will refactor and complement the code as soon as I come up with the most functional way of importing and using data for the template.

I hope that this tutorial helped you with a basic understanding of Jinja2 code and you were able to make your own page (not necessarily a resume page) with a custom template and styling.

That's all Folks! See you in new articles!